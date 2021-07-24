import React from 'react';

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => (
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

export default LoginForm;
