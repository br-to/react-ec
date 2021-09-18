import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import ProductsCard from '../../components/cards/ProductsCard';

const SubCategoryHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(async () => {
    setLoading(true);
    await API.getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            {loading ? (
              <h4 className="disply-4 text-center mt-5 p-3 jumbotron">
                ロード中
              </h4>
            ) : (
              <h4 className="disply-4 text-center mt-5 p-3 jumbotron">
                {sub.name}は{products.length}商品存在します
              </h4>
            )}
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductsCard product={product} />
              {loading}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategoryHome;
