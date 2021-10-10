import React from 'react';
import ProductsCard from '../cards/ProductsCard';

const RelatedProduct = ({ related }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          {related.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductsCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
