import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import ProductsCard from '../components/cards/ProductsCard';
import { useSelector } from 'react-redux';
import { Menu, Slider, Checkbox } from 'antd';
import { DollarOutlined, DownCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadingProducts();
    loadingCategories();
  }, []);

  const fetchProducts = async (arg) => {
    await API.fetchProductsByFilter(arg).then((res) => setProducts(res.data));
  };

  const loadingCategories = async () => {
    await API.getCategories().then((res) => setCategories(res.data));
  };

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

  // 3. 商品金額のフィルターを入れる
  // ok stateの内容が変更されるたびにuseEffectの処理を行う
  useEffect(() => {
    console.log('ok request');
    fetchProducts({ price });
  }, [ok, price]);

  const handleSlider = (value) => {
    // ここでdispatchを呼ぶことによって金額フィルターを使っているときにテキスト検索はクリアする
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. カテゴリのチェックボックス検索を入れる
  const showCategories = () =>
    categories.map((c) => (
      <Checkbox
        key={c._id}
        onChange={handleCategory}
        className="pb-2 pl-4 pr-4 col"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </Checkbox>
    ));

  const handleCategory = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    // ここでcategoryIdsのコピー配列を作る意味は？
    let inTheState = [...categoryIds];
    // チェックon/offを行ったカテゴリー
    let checkedValue = e.target.value;
    // ない場合は-1を返しそれ以外は1から始まるindex番号を返す？
    let foundInTheState = inTheState.indexOf(checkedValue);

    // チェックされているかどうか
    if (foundInTheState === -1) {
      inTheState.push(checkedValue);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>サイドメニュー</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2']} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> 商品金額
                </span>
              }
            >
              <Slider
                className="ml-4 mr-4"
                tipFormatter={(v) => `${v}円`}
                range
                value={price}
                onChange={handleSlider}
                max="100"
              />
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownCircleOutlined /> カテゴリー
                </span>
              }
            >
              {showCategories()}
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
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
