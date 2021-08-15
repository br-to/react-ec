import React from 'react';
import { Card } from 'antd';
import NoImage from '../../images/noimage.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductsCard = ({ product, handleProductRemove }) => {
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
        <Link to={`/admin/products/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleProductRemove(slug)}
        />,
      ]}
      className="m-2"
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductsCard;
