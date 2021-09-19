import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import ProductsCard from '../components/cards/ProductsCard';
import { useSelector } from 'react-redux';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadingProducts();
  }, []);

  // 1.商品情報の取得
  const loadingProducts = async () => {
    setLoading(true);
    await API.getProducts(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // 2.テキストで検索できるようにする
  useEffect(() => {
    // 何もしないとテキストを変更するたびにリクエストが走ってしまうためリクエストを少し遅らせる
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = async (arg) => {
    await API.fetchProductsByFilter(arg).then((res) => setProducts(res.data));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">サブメニュー</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger pt-3">ロード中</h4>
          ) : (
            <h4 className="text-primary pt-3">商品一覧</h4>
          )}

          {products.length < 1 && <p>No products found</p>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductsCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
