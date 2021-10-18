import React from 'react';
import PaymentInfo from '../cards/PaymentInfo';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Order = ({ orders, updateOrderStatus }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">商品名</th>
          <th scope="col">価格</th>
          <th scope="col">ブランド</th>
          <th scope="col">色</th>
          <th scope="col">購入数</th>
          <th scope="col">配送可能か</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((o, i) => (
          <tr key={i}>
            <td>
              <Link to={`/products/${o.product.slug}`}>
                <b>{o.product.title}</b>
              </Link>
            </td>
            <td>{o.product.price}</td>
            <td>{o.product.brand}</td>
            <td>{o.color}</td>
            <td>{o.count}</td>
            <td>
              {o.product.shipping === 'Yes' ? (
                <CheckCircleOutlined className="text-success" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <PaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">配送ステータス</div>
              <div className="col-md-8">
                <select
                  name="status"
                  className="form-control"
                  defaultValue={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="unprocessed">unprocessed</option>
                  <option value="processing">processing</option>
                  <option value="dispatched">dispatched</option>
                  <option value="cancelled">cancelled</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </div>
          </div>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Order;
