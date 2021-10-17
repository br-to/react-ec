import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import ProductsCard from '../components/cards/ProductsCard';
import { useSelector } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
  DollarOutlined,
  DownCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Star from '../components/forms/Star';
const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 10000]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
  ]);
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [shipping, setShipping] = useState('');

  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadingProducts();
    loadingCategories();
    loadingSubs();
  }, []);

  const fetchProducts = async (arg) => {
    await API.fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const loadingCategories = async () => {
    await API.getCategories().then((res) => setCategories(res.data));
  };

  const loadingSubs = async () => {
    await API.getSubs().then((res) => setSubs(res.data));
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
    // テキストが入ってこないとuseEffectが発動しないのでテキストが存在しない場合はloadProductsを入れる
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    if (!text) {
      loadingProducts();
    }
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
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setStar('');
    setCategoryIds([]);
    setBrand('');
    setColor('');
    setShipping('');
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
    setPrice([0, 0]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping('');
    // ここでcategoryIdsのコピーを作るのはuseStateの配列がpushしても採苗がされないため
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

  // 5. レビューの検索
  const handleStar = (num) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand('');
    setColor('');
    setStar(num);
    setShipping('');
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <>
      <Star clickStar={handleStar} numberOfStars={5} />
      <Star clickStar={handleStar} numberOfStars={4} />
      <Star clickStar={handleStar} numberOfStars={3} />
      <Star clickStar={handleStar} numberOfStars={2} />
      <Star clickStar={handleStar} numberOfStars={1} />
    </>
  );

  // 6. ブランドのフィルター
  const showBrands = () =>
    brands.map((b, i) => (
      <Radio
        key={i}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setCategoryIds([]);
    setColor('');
    setBrand(e.target.value);
    setShipping('');
    fetchProducts({ brand: e.target.value });
  };

  // 7. カラーのフィルター
  const showColors = () =>
    colors.map((c, i) => (
      <Radio
        key={i}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setBrand('');
    setCategoryIds([]);
    setColor(e.target.value);
    setShipping('');
    fetchProducts({ color: e.target.value });
  };

  // 8. サブカテゴリーフィルタ
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: 'pointer' }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setBrand('');
    setCategoryIds([]);
    setColor('');
    setShipping('');
    fetchProducts({ sub });
  };

  // 9. 配送フィルター
  const showShippings = () => (
    <>
      <Checkbox
        key="Yes"
        onChange={handleShippings}
        className="pb-2 pl-4 pr-4"
        value="Yes"
        name="Yes"
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>
      <Checkbox
        key="No"
        onChange={handleShippings}
        className="pb-2 pl-4 pr-4"
        value="No"
        name="No"
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippings = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>サイドメニュー</h4>
          <hr />
          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode="inline"
          >
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
                max="10000"
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

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> レビュー
                </span>
              }
            >
              {showStars()}
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <StarOutlined /> ブランド
                </span>
              }
            >
              {showBrands()}
            </SubMenu>
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <StarOutlined /> カラー
                </span>
              }
            >
              {showColors()}
            </SubMenu>
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownCircleOutlined /> サブカテゴリー
                </span>
              }
            >
              {showSubs()}
            </SubMenu>
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownCircleOutlined /> 配送可能か
                </span>
              }
            >
              {showShippings()}
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
