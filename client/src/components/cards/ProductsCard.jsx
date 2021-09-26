import React from 'react';
import { Card } from 'antd';
import NoImage from '../../images/noimage.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ShowAverage } from '../../functions/Ratings';
const { Meta } = Card;

const ProductsCard = ({ product }) => {
  const { title, price, description, images, slug } = product;
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
          <>
            <ShoppingCartOutlined className="text-primary" />
            <br />
            カートに入れる
          </>,
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
