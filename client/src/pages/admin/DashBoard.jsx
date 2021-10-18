import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/Menu/AdminNav';
import API from '../../utils/API';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/orders/Orders';

const DashBoard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    await API.adminGetOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    await API.adminOrderStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('ステータスを変更しました');
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h2>注文一覧</h2>
          <Orders orders={orders} updateOrderStatus={updateOrderStatus} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
