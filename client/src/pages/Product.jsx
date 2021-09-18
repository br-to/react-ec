import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import SingleProduct from '../components/cards/SingleProduct';
import LoadingCard from '../components/cards/LoadingCard';
import RelatedProduct from '../components/cards/RelatedProduct';
import { useSelector } from 'react-redux';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [star, setStar] = useState(0);
  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    // 正しくログインしたユーザーが商品にレビューを加えたか確認
    if (product.ratings && user) {
      let exisitingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      exisitingRatingObject && setStar(exisitingRatingObject.star); // 現在のユーザーのレビュー
    }
  }, [product.ratings, user]);

  const loadProduct = async () => {
    await API.getProduct(slug).then(async (res) => {
      setProduct(res.data);
      // load related
      setLoading(true);
      await API.getRelatedProducts(res.data._id).then((res) => {
        setRelated(res.data);
        setLoading(false);
      });
    });
  };

  const starClick = async (newRate, name) => {
    setStar(newRate);
    await API.updateRate(name, newRate, user.token).then((res) => {
      console.log(res.data);
      loadProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} starClick={starClick} star={star} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>関連商品</h4>
          <hr />
          {related.length && isLoading ? (
            <LoadingCard count={3} />
          ) : (
            <RelatedProduct related={related} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
