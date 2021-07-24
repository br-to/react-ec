import React from 'react';

const RegisterForm = ({ handleSubmit, email, setEmail }) => (
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

export default RegisterForm;
