import React from 'react';
import { Link } from 'react-router-dom';

const ProductItemList = ({ product }) => {
  const { price, category, subs, color, brand, shipping, quantity, sold } =
    product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        商品価格{' '}
        <span className="label label-default label-pill pull-xs-right">
          {price}円
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          カテゴリー{' '}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          サブカテゴリー{' '}
          {subs &&
            subs.map((s) => (
              <Link
                key={s._id}
                to={`/sub/${s.slug}`}
                className="label label-default label-pill pull-xs-right"
              >
                {s.name}
              </Link>
            ))}
        </li>
      )}

      <li className="list-group-item">
        配送可能か{' '}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        色{' '}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        ブランド{' '}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        在庫
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        売れた数
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductItemList;
