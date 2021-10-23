import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuil from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import API from '../utils/API';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const { user, cod } = useSelector((state) => ({ ...state }));
  const isCoupon = useSelector((state) => state.coupon);
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
        setDiscountPrice(0);
        setCoupon('');
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

  const appplyDiscountCoupon = async () => {
    console.log('click', coupon);
    await API.applyUserCoupon(coupon, user.token).then((res) => {
      if (res.data) {
        setDiscountPrice(res.data);
        dispatch({
          type: 'APPLY_COUPON',
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: 'APPLY_COUPON',
          payload: false,
        });
      }
    });
  };

  const handleCashOrder = async () => {
    await API.createCashOrder(cod, isCoupon, user.token).then(async (res) => {
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

        dispatch({
          type: 'COD',
          payload: false,
        });

        await API.removeCart(user.token);
        setTimeout(() => {
          history.push('/checkout/complete');
        }, 1000);
      }
    });
    history.push('/checkout/complete');
  };

  const showAddress = () => (
    <>
      <h4>Delivery Address</h4>
      <br />
      <br />
      <ReactQuil theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={' '}
          {p.product.price * p.count}円
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError('');
        }}
        className="form-control"
      />
      <button onClick={appplyDiscountCoupon} className="btn btn-primary mt-2">
        適用する
      </button>
    </>
  );

  return (
    <div className="row">
      <div className="col-md-6">
        {showAddress()}

        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        {discountError && (
          <p className="bg-danger p-2 mt-2">クーポンが適用できません</p>
        )}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>{products.length}商品</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>合計金額: {total}円</p>
        {discountPrice > 0 && (
          <p className="bg-success p-2 mt-2">支払額は{discountPrice}円です</p>
        )}

        <div className="row">
          <div className="col-md-6">
            {cod ? (
              <button
                className="btn btn-primary"
                disabled={!saveAddress || !products.length}
                onClick={handleCashOrder}
              >
                代引きで支払う
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!saveAddress || !products.length}
                onClick={() => history.push('/checkout/payment')}
              >
                次に進む
              </button>
            )}
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
