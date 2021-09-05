import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count }) => {
  const card = () => {
    let LoadingArr = [];
    for (let i = 0; i < count; i++) {
      LoadingArr.push(
        <Card className="col-md-4" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    console.log(LoadingArr);
    return LoadingArr;
  };

  return <div className="col-m-5 row">{card()}</div>;
};

export default LoadingCard;
