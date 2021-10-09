import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Search from '../forms/Search';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />} className="float-left">
        <Link to="/">Home</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />} className="float-left">
        <Link to="/cart">
          <Badge offset={[4, 0]} count={cart.length}>
            カート
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">会員登録</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">ログイン</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="settings"
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className="float-right"
        >
          {user && user.role === 'subscriber' && (
            <Item key={user.role}>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === 'admin' && (
            <Item key={user.role}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item key="logout" icon={<UserOutlined />} onClick={logout}>
            ログアウト
          </Item>
        </SubMenu>
      )}

      <Item key="search" className="float-right p-1">
        <Search />
      </Item>
    </Menu>
  );
};

export default Header;
