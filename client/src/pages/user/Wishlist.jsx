import React, { useEffect, useState } from 'react';
import UserNav from '../../components/Menu/UserNav';
import { useSelector } from 'react-redux';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    await API.wishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemove = async (productId) => {
    await API.removeWishlist(productId, user.token).then((res) => {
      toast.error('ウィッシュリストから削除しました');
      loadWishlist();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4 className="pt-2">ウィッシュリスト</h4>
          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/products/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
