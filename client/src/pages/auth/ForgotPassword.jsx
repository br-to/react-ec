import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    // firebaseログイン認証
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('メールアドレスを確認してください');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.error('Error msg in forgot password', error);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">ローディング中</h4>
          ) : (
            <h4>パスワード忘れたら</h4>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              autoFocus
            />
            <br />
            <button className="btn btn-raised" disabled={!email}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
