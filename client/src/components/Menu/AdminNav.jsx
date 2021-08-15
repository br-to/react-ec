import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => (
  <>
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            ダッシュボード
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            商品作成
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/products" className="nav-link">
            商品一覧
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            カテゴリー
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link">
            サブカテゴリー
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            パスワード再設定
          </Link>
        </li>
      </ul>
    </nav>
  </>
);

export default AdminNav;
