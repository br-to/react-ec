import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../../../utils/API';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import SearchForm from '../../../components/forms/SearchForm';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  // リロードされたら毎回カテゴリーを取得する
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = async () =>
    await API.getCategories().then((c) => setCategories(c.data));

  const loadSubs = async () => await API.getSubs().then((s) => setSubs(s.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await API.createSub(name, category, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name}を作成しました`);
        loadSubs();
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
      await API.removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name}を削除しました`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>サブカテゴリー登録</h4>
          )}

          <div className="form-group">
            <label>親カテゴリ</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              <option>親カテゴリを選択してください</option>
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            save={'登録する'}
          />

          <SearchForm keyword={keyword} setKeyword={setKeyword} />

          <hr />

          {subs.filter(searched(keyword)).map((s) => (
            <div key={s._id} className="alert alert-primary">
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
