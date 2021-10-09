import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import StarRatings from 'react-star-ratings';
import NoImage from '../../images/noimage.png';
import ProductItemList from './ProductItemList';
import StarRatingModal from '../modal/StarRatingModal';
import { ShowAverage } from '../../functions/Ratings';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

const { TabPane } = Tabs;

const SingleProduct = ({ product, starClick, star }) => {
  const { title, description, images, _id } = product;
  const [tooltip, setTooltip] = useState('カートイン');

  const dispatch = useDispatch();
  const handleAddCart = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
    }

    cart.push({
      ...product,
      count: 1,
    });

    let unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem('cart', JSON.stringify(unique));
    dispatch({
      type: 'ADD_CART',
      payload: unique,
    });
    dispatch({
      type: 'SET_DRAWER',
      payload: true,
    });
    setTooltip('カートに入れました');
  };

  return (
    <>
      <div className="col-md-6">
        {images && images.length ? (
          <Carousel infiniteLoop autoPlay>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt={i.alt} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img alt="product card" src={NoImage} className="mb-4 no-img" />
            }
          />
        )}
        <Tabs type="card">
          <TabPane tab="商品説明" key={1}>
            {description && description}
          </TabPane>
          <TabPane tab="More" key={2}>
            もっと説明してっちょ
          </TabPane>
        </Tabs>
      </div>
       
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          ShowAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">レビューがありません</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddCart}>
                <ShoppingCartOutlined className="text-primary" />
                <br />
                カートに入れる
              </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to Wishlist
            </Link>,
            <StarRatingModal>
              {/* StarRatingコンポーネントの中身がchildrenになる */}
              <StarRatings
                rating={star}
                starRatedColor="red"
                changeRating={starClick}
                numberOfStars={5}
                isSelectable={true}
                name={_id}
              />
            </StarRatingModal>,
          ]}
        >
          <ProductItemList product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
