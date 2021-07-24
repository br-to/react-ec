import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName, save }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Category Name"
      />
    </div>

    <br />

    <button
      type="submit"
      className="btn btn-raised"
      disabled={!name}
      onClick={handleSubmit}
    >
      {save}
    </button>
  </form>
);

export default CategoryForm;
