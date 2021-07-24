import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  // リロードされたら毎回カテゴリーを取得する
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () =>
    await API.getCategories().then((c) => setCategories(c.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await API.createCategory(name, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name}を作成しました`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm('削除しますか？')) {
      setLoading(true);
      await API.removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name}を削除しました`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const CategoryForm = () => (
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
        カテゴリー登録
      </button>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">ローディング中...</h4>
          ) : (
            <h4>カテゴリー登録</h4>
          )}
          {CategoryForm()}
          <hr />
          {categories.map((c) => (
            <div key={c._id} className="alert alert-primary">
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
