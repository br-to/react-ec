import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Product from './pages/Product';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Header from './components/Menu/Header';
import Drawer from './components/drawer/SideDrawer';
import History from './pages/user/History';
import Wishlist from './pages/user/Wishlist';
import Password from './pages/user/Password';
import CategoryHome from './pages/category/CategoryHome';
import SubCategoryHome from './pages/sub/SubCategoryHome';
import UserRoute from './components/routes/UserRoute';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderComplete from './pages/OrderComplete';
import RegisterComplete from './pages/auth/RegisterComplete';
import Complete from './pages/auth/Complete';
import ForgotPassword from './pages/auth/ForgotPassword';
import DashBoard from './pages/admin/DashBoard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProducts';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import AdminRoute from './components/routes/AdminRoute';
import Coupon from './pages/admin/coupon/Coupon';
import Shop from './pages/Shop';
import Cart from './pages/Cart'
import API from './utils/API';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  // reloadしたときにstateがemail,tokenだけになってしまうのでこちらも修正する必要がある
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log('user', user);

        // redux store
        await API.currentUser(idTokenResult.token).then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        }).catch((err) => console.error(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Drawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/complete" component={Complete} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={DashBoard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/products/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/coupon" component={Coupon} />
        <Route exact path="/products/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubCategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout/address" component={Checkout} />
        <UserRoute exact path="/checkout/payment" component={Payment} />
        <UserRoute exact path="/checkout/complete" component={OrderComplete} />
      </Switch>
    </>
  );
};

export default App;
