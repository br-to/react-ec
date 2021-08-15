import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import API from '../../../utils/API';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () =>
    await API.getCategories().then((c) =>
      setValues({ ...values, categories: c.data })
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        // setValues(initialState);
        toast.success('商品を作成しました！');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    console.log('カテゴリクリック', e.currentTarget.value);
    setValues({ ...values, subs: [], category: e.currentTarget.value });
    await API.getCategorySub(e.currentTarget.value).then((res) => {
      console.log('sub option on category click', res.data);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>商品作成</h4>
          <hr />

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
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

export default ProductCreate;
