import React from 'react';
import ModalImage from 'react-modal-image';
import NoImage from '../../images/noimage.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const ProductCartInCheckout = ({ p }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useDispatch();

  // 色を変更する
  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map(
        (product, i) =>
          (cart[i].color = product._id === p._id ? e.target.value : '')
      );

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_CART',
        payload: cart,
      });
    }
  };

  // 数量を変更する
  const handleQuantity = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`${p.quantity}個までしか入れれません`);
      count = p.quantity;
      return;
    }
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
    }

    cart.map(
      (product, i) => (cart[i].count = product._id === p._id ? count : '')
    );

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'ADD_CART',
      payload: cart,
    });
  };

  // 商品を削除する
  const handleRemove = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) =>
        product._id === p._id ? cart.splice(i, 1) : ''
      );

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_CART',
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td style={{ width: '100px', height: 'auto' }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={NoImage} large={NoImage} />
          )}
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>色選択</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            value={p.count}
            type="number"
            className="form-control"
            onChange={handleQuantity}
          />
        </td>
        <td className="text-center">
          {p.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined className="text-danger" onClick={handleRemove} />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartInCheckout;
