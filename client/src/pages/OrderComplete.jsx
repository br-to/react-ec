import React from 'react';
import { Link } from 'react-router-dom';

const OrderComplete = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4 className="pt-2">注文が完了しました</h4>
        <Link to="/">買い物を続ける</Link>
      </div>
    </div>
  </div>
);

export default OrderComplete;
