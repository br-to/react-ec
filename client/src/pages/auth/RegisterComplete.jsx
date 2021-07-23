import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import API from '../../utils/API';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error('emailまたはパスワードは必須です');
      return;
    }

    if (password.length < 6) {
      toast.error('パスワードは6文字以上にしてください');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        // ローカルストレージの削除
        window.localStorage.removeItem('emailForRegistration');
        // ユーザーのidtokenを取得
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux storeで管理
        console.log('user', user, 'idtokenresult', idTokenResult);
        toast.success('会員登録が完了しました');
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
          })
          .catch((err) => console.log(err));
        // Topにリダイレクト
        history.push('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.mesasge);
    }
  };

  const CompleteRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="password"
        autoFocus
      />
      <br />

      <button type="submit" className="btn btn-raised">
        会員登録完了
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>パスワード入力</h4>
          {CompleteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
