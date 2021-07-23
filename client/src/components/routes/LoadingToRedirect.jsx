import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  let history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    // 1秒毎にcountを1減らす
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // カウントが0になったらredirectされる。
    count === 0 && history.push('/');

    // タイマー解除
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container">
      <h2>{count}秒後にホーム画面に戻ります</h2>
    </div>
  );
};

export default LoadingToRedirect;
