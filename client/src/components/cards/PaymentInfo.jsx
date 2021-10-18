import React from 'react';

const PaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>注文峰号: {order.paymentIntent.id}</span> /{' '}
      <span>支払い金額: {order.paymentIntent.amount}円</span> /{' '}
      <span>通貨: {order.paymentIntent.currency.toUpperCase()}</span> /{' '}
      <span>支払い方法: {order.paymentIntent.payment_method_types[0]}</span> /{' '}
      <span>支払いステータス: {order.paymentIntent.status}</span> /{' '}
      <span>
        注文日:
        {new Date(order.paymentIntent.created * 1000).toLocaleString('ja-JP')}
      </span>
      / <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          注文ステータス: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default PaymentInfo;
