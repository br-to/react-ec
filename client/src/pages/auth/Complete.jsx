import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Complete = () => (
  <div className="container p-5">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4>メール送信が完了したよ</h4>
        <Link to="/home" icon={<HomeOutlined />}>
          Homeに戻る
        </Link>
      </div>
    </div>
  </div>
);

export default Complete;
