import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import NoImage from '../../images/noimage.png';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover',
  };

  const handleCloseDrawer = () => {
    dispatch({
      type: 'SET_DRAWER',
      payload: false,
    });
  };
  return (
    <Drawer
      title={`カート / ${cart.length}商品`}
      placement="right"
      closable={false}
      onClose={handleCloseDrawer}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col m-2">
            {p.images[0] ? (
              <>
                <img
                  src={p.images[0].url}
                  style={imageStyle}
                  alt={p.images[0].title}
                />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={NoImage} style={imageStyle} alt={p.title} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={handleCloseDrawer}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          カートへ
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
