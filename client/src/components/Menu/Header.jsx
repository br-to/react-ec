import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

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
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item key="logout" icon={<UserOutlined />} onClick={logout}>
            ログアウト
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
