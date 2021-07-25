import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API from '../../../utils/API';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ match, history }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  // リロードされたら毎回カテゴリーを取得する
  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = async () =>
    await API.getCategories().then((c) => setCategories(c.data));

  const loadSub = async () =>
    await API.getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await API.updateSub(match.params.slug, name, parent, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name}に更新しました`);
        history.push('/admin/sub');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
            <h4>サブカテゴリー編集</h4>
          )}

          <div className="form-group">
            <label>親カテゴリ</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.currentTarget.value)}
            >
              <option>親カテゴリを選択してください</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option value={c._id} key={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            save={'編集する'}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
