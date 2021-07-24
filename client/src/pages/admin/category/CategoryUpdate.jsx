import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../../../utils/API';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // リロードされたら毎回カテゴリーを取得する
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () =>
    await API.getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await API.updateCategory(match.params.slug, name, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name}に更新しました`);
        history.push('/admin/category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
        カテゴリー編集
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
            <h4>カテゴリー編集</h4>
          )}
          {CategoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
