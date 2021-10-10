import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuil from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import API from '../utils/API';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(async () => {
    await API.getCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = async () => {
    // localStorageからカート情報を削除
    if (window.confirm('カートを空にしますか')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }

      //  reduxからカート情報を削除する
      dispatch({
        type: 'ADD_CART',
        payload: [],
      });

      // DB, stateから削除する
      await API.removeCart(user.token).then((res) => {
        setProducts([]);
        setTotal(0);
        toast.success('カートを空にしました');
      });
    }
  };

  const saveAddressToDb = async () => {
    await API.saveAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setSaveAddress(true);
        toast.success('配送先を登録しました');
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <ReactQuil theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length}商品</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={' '}
              {p.product.price * p.count}円
            </p>
          </div>
        ))}
        <hr />
        <p>合計金額: {total}円</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!saveAddress || !products.length}
            >
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button onClick={emptyCart} className="btn btn-primary">
              カートを空にする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
