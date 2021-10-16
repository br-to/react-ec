import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';
import API from '../utils/API';

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);

const Payment = () => {
  const [cart, setCart] = useState([]);
  const { user } = useSelector((user) => ({ ...user }));

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    await API.getCart(user.token).then((res) => setCart(res.data.products));
  };

  const showProductSummary = () =>
    cart.map((c, i) => (
      <div key={i}>
        <p>
          {c.product.title} ({c.color}) x {c.count} = {c.price * c.count}円
        </p>
      </div>
    ));

  return (
    <div className="container p-5 text-center">
      <div className="row">
        <Elements stripe={promise}>
          <div className="col-md-8 offset-md-2">
            <h4>支払い手続き</h4>
            <StripeCheckout />
          </div>
        </Elements>
      </div>
      <div>
        <h4>Order Summary</h4>

        <p>{cart.length}商品</p>

        {showProductSummary()}
      </div>
    </div>
  );
};

export default Payment;
