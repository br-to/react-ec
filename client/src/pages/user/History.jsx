import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import { useSelector } from 'react-redux';
import UserNav from '../../components/Menu/UserNav';
import { Link } from 'react-router-dom';
import PaymentInfo from '../../components/cards/PaymentInfo';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/orders/Invoice';
const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(async () => {
    await API.getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  }, []);

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

  const pdfDownload = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      PDFをダウンロードする
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>決済情報</p>
        <PaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{pdfDownload(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4 className="pt-2">
            {orders.length > 0 ? '購入履歴' : '購入履歴がありません'}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
