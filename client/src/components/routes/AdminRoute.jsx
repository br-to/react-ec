import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import API from '../../utils/API';

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      const adminCheck = async () => {
        await API.currentAdmin(user.token)
          .then((res) => {
            console.log('current admin res', res);
            setOk(true);
          })
          .catch((err) => {
            console.error('admin route err', err);
            setOk(false);
          });
      };
      adminCheck();
    }
  }, [user]);

  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
