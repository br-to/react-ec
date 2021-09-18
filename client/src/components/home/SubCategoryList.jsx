import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';

const SubCategoryList = () => {
  const [subs, setSubs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    loadSubCategories();
  }, []);

  const loadSubCategories = async () => {
    setLoading(true);
    await API.getSubs().then((c) => {
      setSubs(c.data);
      setLoading(false);
    });
  };

  const subCategoryShow = () => {
    return subs.map((c) => (
      <div className="m-3 btn btn-lg btn-outlined-primary btn-raised">
        <Link to={`/sub/${c.slug}`} key={c._id}>
          {c.name}
        </Link>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {isLoading ? (
          <h4 className="text-center">ロード中</h4>
        ) : (
          subCategoryShow()
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
