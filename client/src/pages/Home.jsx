import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';
import NewItem from '../components/home/NewItem';
import CategoryList from '../components/home/CategoryList';
import SubCategoryList from '../components/home/SubCategoryList';

const Home = () => {
  // const [page, setPage] = useState(1);
  // const [productsCount, setProductsCount] = useState(0);
  return (
    <>
      <div className="jumbotron text-center h1 font-weight-bold text-warning">
        <Jumbotron text={['商品一覧', '新着商品', 'ベストセラー']} />
      </div>
      <h4 className="disply-4 text-center mt-5 p-3 jumbotron">新着商品</h4>
      <NewItem />
      <br />
      <h4 className="disply-4 text-center mt-5 p-3 jumbotron">ベストセラー</h4>
      <BestSellers />
      <br />
      <h4 className="disply-4 text-center mt-5 p-3 jumbotron">カテゴリー</h4>
      <CategoryList />
      <br />
      <h4 className="disply-4 text-center mt-5 p-3 jumbotron">
        サブカテゴリー
      </h4>
      <SubCategoryList />
      <br />
    </>
  );
};

export default Home;
