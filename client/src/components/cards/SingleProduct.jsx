import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NoImage from '../../images/noimage.png';
import ProductItemList from './ProductItemList';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, description, images } = product;

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
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <ProductItemList product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
