import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../utils/API';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // firebaseログイン認証
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      await API.checkAuth(idTokenResult.token);

      // dispatch({
      //   type: 'LOGGED_IN_USER',
      //   payload: {
      //     email: user.email,
      //     token: idTokenResult.token,
      //   },
      // });
      history.push('/');
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('ログインでエラーが発生しました');
    }
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="パスワード"
        />
      </div>
      <br />

      <button
        type="submit"
        className="btn btn-raised"
        disabled={!email | (password.length < 6)}
        onClick={handleSubmit}
      >
        ログイン
      </button>
    </form>
  );

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push('/');
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
          {LoginForm()}

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
