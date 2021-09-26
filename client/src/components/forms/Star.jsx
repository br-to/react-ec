import React from 'react';
import StarRatings from 'react-star-ratings';

const Star = ({ clickStar, numberOfStars }) => (
  <>
    <StarRatings
      starRatedColor="red"
      changeRating={() => clickStar(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starEmptyColor="red"
    />
    <br />
  </>
);

export default Star;
