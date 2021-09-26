import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    await API.getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  };

  const categoryShow = () => {
    return categories.map((c) => (
      <div
        key={c._id}
        className="m-3 btn btn-lg btn-outlined-primary btn-raised"
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {isLoading ? <h4 className="text-center">ロード中</h4> : categoryShow()}
      </div>
    </div>
  );
};

export default CategoryList;
