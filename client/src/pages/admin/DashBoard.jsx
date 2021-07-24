import React from 'react';
import AdminNav from '../../components/Menu/AdminNav';

const DashBoard = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">admin dashboard</div>
    </div>
  </div>
);

export default DashBoard;
