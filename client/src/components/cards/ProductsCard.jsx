import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import NoImage from '../../images/noimage.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ShowAverage } from '../../functions/Ratings';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
const { Meta } = Card;

const ProductsCard = ({ product }) => {
  const { title, price, description, images, slug } = product;
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
      {product && product.ratings && product.ratings.length > 0 ? (
        ShowAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">レビューがありません</div>
      )}
      <Card
        cover={
          <img
            alt="product card"
            src={images && images.length ? images[0].url : NoImage}
            style={{ height: '150px', objectFit: 'cover' }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/products/${slug}`}>
            <EyeOutlined className="text-primary" />
            <br />
            商品詳細へ
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddCart}>
              <ShoppingCartOutlined className="text-primary" />
              <br />
              カートに入れる
            </a>
          </Tooltip>,
        ]}
        className="m-2"
      >
        <Meta
          title={`${title} - ${price}円`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductsCard;
