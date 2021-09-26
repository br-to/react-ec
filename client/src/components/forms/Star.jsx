import React from 'react';
import StarRatings from 'react-star-ratings';

const Star = ({ clickStar, numberOfStars }) => (
  <div className="pr-4 pl-4 pb-1">
    <StarRatings
      className=""
      starRatedColor="red"
      changeRating={() => clickStar(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starEmptyColor="red"
    />
    <br />
  </div>
);

export default Star;
