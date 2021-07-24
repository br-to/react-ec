import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from '../../components/forms/RegisterForm';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

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
    history.push('/complete');
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>会員登録</h4>
          <RegisterForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
