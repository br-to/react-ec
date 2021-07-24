import React from 'react';

const CompleteRegistrationForm = ({
  handleSubmit,
  email,
  password,
  setPassword,
}) => (
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

export default CompleteRegistrationForm;
