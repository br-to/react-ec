import React from 'react';
import { Card } from 'antd';
import NoImage from '../../images/noimage.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const ProductsCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
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
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductsCard;
