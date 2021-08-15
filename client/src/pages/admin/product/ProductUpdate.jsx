import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import API from '../../../utils/API';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = async () => {
    await API.getProduct(slug).then(async (product) => {
      // 1. 商品情報を取得してvaluesstateに商品情報を入れる
      setValues({ ...values, ...product.data });
      // 2. サブカテゴリ情報を取得を取得してsubOptionsstateにサブカテゴリ情報を入れる
      await API.getCategorySub(product.data.category?._id).then((res) => {
        setSubOptions(res.data);
      });
      // 3. antdデザインのSelectコンポーネントに入れるデフォルトのサブカテゴリ配列を作成する
      let arr = [];
      let { subs } = product.data;
      subs.map((s) => arr.push(s._id));
      console.log('ARR', arr);
      setArrayOfSubs((prev) => arr);
    });
  };

  const loadCategories = async () =>
    await API.getCategories().then((c) => {
      console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data);
      setCategories(c.data);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    await API.updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(res);
        // setValues(initialState);
        toast.success('商品を編集しました');
        history.push('/admin/products');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    console.log('カテゴリクリック', e.currentTarget.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);
    await API.getCategorySub(e.currentTarget.value).then((res) => {
      console.log('sub option on category click', res.data);
      setSubOptions(res.data);
    });

    // 同じカテゴリをクリックした時デフォルトのサブカテゴリ状態に戻したいためロードする
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    console.log(values.category._id);
    console.log(e.target.value);
    // カテゴリが変更になったらarrayOfSubsStateはクリアする
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>商品編集</h4>
          <hr />

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />

          <div className="col-md-10">
            {loading ? <LoadingOutlined className="text-danger h1" /> : ''}
            <hr />
          </div>

          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
