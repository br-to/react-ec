import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import ProductsCard from '../cards/ProductsCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

const NewItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(async () => {
    await API.getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    await API.sortProducts('createdAt', 'desc', page).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductsCard product={product} />
                {loading}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewItem;
