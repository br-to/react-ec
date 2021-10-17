import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import API from '../utils/API';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined, SwapOutlined } from '@ant-design/icons';

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, coupon } = useSelector((user) => ({ ...user }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPayment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(true);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      await API.createOrder(payload, user.token).then(async (res) => {
        if (res.data.ok) {
          // localStorageからカート削除
          if (typeof window !== 'undefined') localStorage.removeItem('cart');
          // reduxからカート情報、クーポン情報削除
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });

          dispatch({
            type: 'APPLY_COUPON',
            payload: false,
          });

          await API.removeCart(user.token);
        }
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      history.push('/checkout/complete');
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const createPayment = async () => {
    await API.createPaymentIntent(coupon, user.token).then((res) => {
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`支払額: ${totalAfterDiscount}円`}</p>
          ) : (
            <p className="alert alert-danger">クーポンが適用されていません</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> 合計金額:
              {cartTotal}円
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> 支払い金額 :
              {payable}円
            </>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              '支払いを完了する'
            )}
          </span>
        </button>
      </form>
    </>
  );
};

export default StripeCheckout;
