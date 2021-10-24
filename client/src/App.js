import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import API from './utils/API';

const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const  Product  = lazy(()  => import('./pages/Product'));
const  Login = lazy(()  => import( './pages/auth/Login'));
const  Register = lazy(()  => import( './pages/auth/Register'));
const  Home  = lazy(()  => import('./pages/Home'));
const  Header = lazy(()  => import( './components/Menu/Header'));
const  Drawer = lazy(()  => import( './components/drawer/SideDrawer'));
const  History = lazy(()  => import( './pages/user/History'));
const  Wishlist = lazy(()  => import( './pages/user/Wishlist'));
const  Password = lazy(()  => import( './pages/user/Password'));
const  CategoryHome = lazy(()  => import( './pages/category/CategoryHome'));
const  SubCategoryHome = lazy(()  => import('./components/routes/UserRoute'));
const  Checkout  = lazy(()  => import('./pages/Checkout'));
const  Payment  = lazy(()  => import('./pages/Payment'));
const  OrderComplete  = lazy(()  => import('./pages/OrderComplete'));
const  RegisterComplete  = lazy(()  => import('./pages/auth/RegisterComplete'));
const  Complete = lazy(()  => import( './pages/auth/Complete'));
const  ForgotPassword = lazy(()  => import( './pages/auth/ForgotPassword'));
const  DashBoard = lazy(()  => import( './pages/admin/DashBoard'));
const  CategoryCreate  = lazy(()  => import('./pages/admin/category/CategoryCreate'));
const  SubUpdate = lazy(()  => import( './pages/admin/sub/SubUpdate'));
const  SubCreate  = lazy(()  => import('./pages/admin/sub/SubCreate'));
const  ProductCreate = lazy(()  => import( './pages/admin/product/ProductCreate'));
const  ProductUpdate = lazy(()  => import( './pages/admin/product/ProductUpdate'));
const  AllProducts = lazy(()  => import('./pages/admin/product/AllProducts'));
const  CategoryUpdate = lazy(()  => import( './pages/admin/category/CategoryUpdate'));
const  AdminRoute  = lazy(() => import( './components/routes/AdminRoute'));
const  Coupon  = lazy(()  => import('./pages/admin/coupon/Coupon'));
const  Shop  = lazy(()  => import('./pages/Shop'));
const  Cart = lazy(()  => import( './pages/Cart'));




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
    <Suspense fallback={
      <div className="col text-center p-5">
        <LoadingOutlined />
      </div>
    }>
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
    </Suspense>
  );
};

export default App;
