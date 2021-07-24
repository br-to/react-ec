import React from 'react';

const SearchForm = ({ keyword, setKeyword }) => {
  /* step3 handleSearchChangeメソッドの作成 */

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.currentTarget.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default SearchForm;
