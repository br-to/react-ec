import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import SingleProduct from '../components/cards/SingleProduct';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    await API.getProduct(slug).then((res) => setProduct(res.data));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>関連商品</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
