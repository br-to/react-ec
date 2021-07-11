import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`${email}にメールが送信されました！`);
    // localStorageに登録されたメアド情報を残す
    window.localStorage.setItem('emailForRegistration', email);
    // 送信されたらformをからにする
    setEmail('');
  };

  const RegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        autoFocus
      />
      <br />
      <button type="submit" disabled={!email} className="btn btn-raised">
        会員登録
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>会員登録</h4>
          {RegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
