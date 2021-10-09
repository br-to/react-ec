import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((l, m) => l + m.count * m.price, 0);
  };

  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">画像</th>
          <th scope="col">商品タイトル</th>
          <th scope="col">価格</th>
          <th scope="col">ブランド</th>
          <th scope="col">色</th>
          <th scope="col">数量</th>
          <th scope="col">配送できるか</th>
          <th scope="col">削除する</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCartInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-8">
          <h4>カート / {cart.length} 商品</h4>
          {!cart.length ? (
            <p>
              カートに商品を入れてください。
              <Link to="/">Continue Shopping</Link>
            </p>
          ) : (
            showCartItem()
          )}
        </div>
        <div className="col-md-4">
          <h4>注文サマリ</h4>
          <hr />
          <p>商品一覧</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} ✖︎ {c.count} = {c.price * c.count}円
              </p>
            </div>
          ))}
          合計: <b>{getTotal()}円</b>
          <hr />
          {user ? (
            <button
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              チェックアウト
            </button>
          ) : (
            <Link
              to={{
                pathname: '/login',
                state: { from: 'cart' },
              }}
            >
              <button className="btn btn-sm btn-primary mt-2">
                チェックアウト
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
