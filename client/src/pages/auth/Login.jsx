import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import LoginForm from '../../components/forms/LoginForm';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const checkRole = (res) => {
    // from stateを商品詳細ページから受け取る
    let { from } = history.location.state;
    if (from) {
      // from stateが存在する場合そのページに遷移
      history.push(from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('./user/history');
      }
    }
  };

  useEffect(() => {
    let intended = history.location.state;
    console.log(intended);
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push('/');
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // firebaseログイン認証
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // backend側から受け取った値をdispatchしてstateに入れている
      await API.createOrUpdateUser(idTokenResult.token)
        .then((res) => {
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
          checkRole(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('ログインでエラーが発生しました');
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        await API.createOrUpdateUser(idTokenResult.token)
          .then((res) => {
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
            checkRole(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">ローディング中</h4>
          ) : (
            <h4>ログイン</h4>
          )}

          <LoginForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <button
            type="submit"
            className="danger btn btn-raised"
            onClick={googleLogin}
          >
            Google Login
          </button>
          <Link to="/forgot/password" className="text-danger float-right">
            パスワードを忘れた方はこちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
