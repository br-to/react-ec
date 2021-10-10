import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

const StarRatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [RateVisible, setRateVisible] = useState(false);
  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setRateVisible(true);
    } else {
      // ログインした後ろログインする前のページに戻すために
      // react-routerの機能でstateを渡す
      history.push({
        pathname: '/login',
        state: { from: `/products/${slug}` },
      });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? 'レビューする' : 'レビューの前にログイン'}
      </div>
      <Modal
        title="レビューする"
        centered
        visible={RateVisible}
        onOk={() => {
          setRateVisible(false);
          toast.success('レビューが完了しました！');
        }}
        onCancel={() => setRateVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default StarRatingModal;
