import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNav from '../../../components/Menu/AdminNav';
import API from '../../../utils/API';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const Coupon = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((user) => ({ ...user }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.createCoupon({ name, discount, expiry }, user.token)
      .then((res) => {
        setLoading(false);
        getCoupons();
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`${res.data.name}が作成できました`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    await API.listCoupons().then((res) => setCoupons(res.data));
  };

  const handleRemove = async (couponId) => {
    if (window.confirm('クーポンを削除しますか?')) {
      setLoading(true);
      await API.deleteCoupon(couponId, user.token)
        .then((res) => {
          getCoupons();
          setLoading(false);
          toast.error(`${res.data.name}を削除しました`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 mt-2">
          {loading ? <h4>ロード中。。。</h4> : <h4>クーポン</h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">クーポン名</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">割引率</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">有効期限日</label>
              <DatePicker
                selected={new Date()}
                onChange={(date) => setExpiry(date)}
                value={expiry}
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-outline-primary">作成する</button>
          </form>
          {loading ? <h4>ロード中</h4> : <h4>{coupons.length} クーポン</h4>}

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">クーポン名</th>
                <th scope="col">有効期限日</th>
                <th scope="col">割引率</th>
                <th scope="col">アクション</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString('ja-JP')}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
