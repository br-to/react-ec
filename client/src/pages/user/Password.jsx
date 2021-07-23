import { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import UserNav from '../../components/Menu/UserNav';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('パスワードが更新されました');
      })
      .catch((err) => {
        console.error(err);
        toast.error('パスワードの更新に失敗しました');
      });
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="6文字以上bパスワード入力してね"
          disabled={loading}
        />
      </div>
      <br />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!password | (password.length < 6) | loading}
        onClick={handleSubmit}
      >
        パスワード再設定
      </button>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">ローディング中</h4>
          ) : (
            <h4>パスワード再設定</h4>
          )}
          {LoginForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
