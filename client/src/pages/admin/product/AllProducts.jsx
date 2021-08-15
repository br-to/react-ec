import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Menu/AdminNav';
import API from '../../../utils/API';
import { toast } from 'react-toastify';
import AdminProductsCard from '../../../components/cards/AdminProductsCard';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    await API.getProducts(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleProductRemove = async (slug) => {
    if (window.confirm('削除しますか？')) {
      setLoading(true);
      await API.removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.title}を削除しました`);
          getProducts();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h2 className="col text-danger">Loading...</h2>
          ) : (
            <h2 className="col">商品一覧</h2>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <AdminProductsCard
                  product={product}
                  handleProductRemove={handleProductRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
