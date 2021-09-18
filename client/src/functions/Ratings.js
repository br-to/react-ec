import React from 'react';
import StarRating from 'react-star-ratings';

export const ShowAverage = (p) => {
  if (p && p.ratings) {
    const ratingsArray = p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log('length', length);
    // star arrayだけ取り出す
    ratingsArray.map((r) => total.push(r.star));
    console.log('total', total);
    // total配列の合計
    let totalReduced = total.reduce((l, m) => l + m);
    let average = (totalReduced * 5) / (length * 5);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating rating={average} starDimension="20px" starSpacing="2px" starRatedColor="blue" /> ({length})
        </span>
      </div>
    );
  }
};
