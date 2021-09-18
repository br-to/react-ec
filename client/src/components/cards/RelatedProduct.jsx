import React, { useEffect, useState } from 'react';
// import API from '../../utils/API';
import ProductsCard from '../cards/ProductsCard';
// import LoadingCard from '../cards/LoadingCard';

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
