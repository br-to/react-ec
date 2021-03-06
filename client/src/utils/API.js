import axios from 'axios';

import { REACT_APP_API_URL } from '../constants/App';

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 15000,
  cors: true,
});

class API {

  // auth API
  createOrUpdateUser(authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken,
      },
      url: '/create-or-update-user',
      data: {},
    });
  }

  currentUser(authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken,
      },
      url: '/current-user',
      data: {},
    });
  }

  currentAdmin(authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken,
      },
      url: '/current-admin',
      data: {},
    });
  }

  // Category API
  getCategories () {
    return api.request({
      method: 'GET',
      url: '/categories'
    });
  }

  getCategory (slug) {
    return api.request({
      method: 'GET',
      url: `/category/${slug}`,
    })
  }

  removeCategory (slug, authToken) {
    return api.request({
      method: 'DELETE',
      headers: {
        authToken,
      },
      url: `/category/${slug}`,
    })
  }

  updateCategory (slug, category, authToken) {
    return api.request({
      method: 'PUT',
      headers: {
        authToken
      },
      url: `/category/${slug}`,
      data: {
        name: category,
      }
    })
  }

  createCategory (category, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      url: '/category/create',
      data: {
        name: category,
      }
    })
  }

  getCategorySub (_id) {
    return api.request({
      method: 'GET',
      url: `/category/sub/${_id}`
    })
  }

   // Sub Category API
  getSubs () {
    return api.request({
      method: 'GET',
      url: '/subs'
    });
  }

  getSub (slug) {
    return api.request({
      method: 'GET',
      url: `/sub/${slug}`,
    })
  }

  removeSub (slug, authToken) {
    return api.request({
      method: 'DELETE',
      headers: {
        authToken,
      },
      url: `/sub/${slug}`,
    })
  }

  updateSub (slug, sub, parent, authToken) {
    return api.request({
      method: 'PUT',
      headers: {
        authToken
      },
      url: `/sub/${slug}`,
      data: {
        name: sub,
        parent
      }
    })
  }

  createSub (sub, parent, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      url: '/sub/create',
      data: {
        name: sub,
        parent: parent,
      }
    })
  }

  // ??????CRUD
  createProduct (product, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      url: '/product',
      data: product,
    })
  }

  getProducts (count) {
    return api.request({
      method: 'GET',
      url: `/products/${count}`,
    })
  }

  getProduct (slug) {
    return api.request({
      method: 'GET',
      url: `/product/${slug}`,
    })
  }

  // ??????????????????????????????????????????????????????
  sortProducts (sort, order, page) {
    return api.request({
      method: 'POST',
      data: {
        sort,
        order,
        page,
      },
      url: `/products/`,
    })
  }

  getProductsCount () {
    return api.request({
      method: 'GET',
      url: '/products/total',
    })
  }

  updateProduct (slug, product, authToken) {
    return api.request({
      method: 'PUT',
      headers: {
        authToken,
      },
      url: `/product/${slug}`,
      data: product,
    })
  }

  removeProduct (slug, authToken) {
    return api.request({
      method: 'DELETE',
      headers: {
        authToken,
      },
      url: `/product/${slug}`,
    })
  }

  // ????????????????????????
  uploadImages (uri, user) {
    return api.request({
      method: 'POST',
      headers: {
        authtoken: user ? user.token : '',
      },
      url: '/uploadimages',
      data: {
        image: uri,
      }
    })
  }

  removeImage (user, public_id) {
    return api.request({
      method: 'POST',
      headers: {
        authtoken: user ? user.token : '',
      },
      url: '/removeimage',
      data: {
        public_id
      },
    })
  }

  // ??????????????????
  updateRate (productId, star, authToken) {
    return api.request({
      method: 'PUT',
      headers: {
        authToken,
      },
      url: `/product/star/${productId}`,
      data: {
        star
      }
    })
  }
  // ?????????????????????
  getRelatedProducts (productId) {
    return api.request({
      method: 'GET',
      headers: {},
      url: `/product/related/${productId}`,
      data: {},
    })
  }
  // ?????????????????????????????????
  fetchProductsByFilter (query) {
    return api.request({
      method: 'POST',
      headers: {},
      url: '/search/filter',
      data: query
    })
  }

  // ??????????????????DB???????????????
  userCart (cart, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      url: '/user/cart',
      data: {
        cart
      }
    })
  }

  // ????????????????????????
  getCart (authToken) {
    return api.request({
      method: 'GET',
      headers: {
        authToken
      },
      url: '/user/cart'
    })
  }

  // ????????????????????????
  removeCart (authToken) {
    return api.request({
      method: 'Delete',
      headers: {
        authToken
      },
      url: '/user/cart'
    })
  }

  // ?????????????????????
  saveAddress (authToken, address) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      url: '/user/address',
      data: {
        address
      }
    })
  }

  // ??????????????????
  createCoupon (coupon, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      url: '/coupon',
      data: {
        coupon
      }
    })
  }

  // ????????????????????????
  listCoupons () {
    return api.request({
      method: 'GET',
      url: '/coupons',
    })
  }

  // ??????????????????
  deleteCoupon (couponId, authToken) {
    return api.request({
      method: 'DELETE',
      headers: {
        authToken
      },
      url: `/coupon/${couponId}`
    })
  }

  // ?????????????????????
  applyUserCoupon (coupon, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      data: {
        coupon
      },
      url: '/user/cart/coupon'
    })
  }

  // ?????????????????????????????????????????????
  createPaymentIntent (coupon, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      data: {
        couponApplied: coupon,
      },
      url: '/create-payment-intent'
    })
  }

  // ???????????????????????????
  createOrder (stripeResponse, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      data: {
        stripeResponse
      },
      url: '/user/order'
    })
  }

  // ?????????????????????
  getOrders (authToken) {
    return api.request({
      method: 'GET',
      headers: {
        authToken
      },
      data: {},
      url: '/user/orders'
    })
  }

  // ?????????????????????????????????
  adminGetOrders (authToken) {
    return api.request({
      method: 'GET',
      headers: {
        authToken
      },
      data: {},
      url: '/admin/orders'
    })
  }

  // ???????????????????????????????????????
  adminOrderStatus (orderId, orderStatus, authToken) {
    return api.request({
      method: 'PUT',
      headers: {
        authToken
      },
      data: {
        orderId,
        orderStatus,
      },
      url: '/admin/order-status'
    })
  }

  // wishlist??????
  addToWishlist (productId, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      data: {
        productId
      },
      url: `/user/wishlist`
    })
  }

  // wishlist??????
  wishlist (authToken) {
    return api.request({
      method: 'GET',
      headers: {
        authToken
      },
      data: {},
      url: '/user/wishlist'
    })
  }

  // wishlist??????
  removeWishlist (productId, authToken) {
    return api.request({
      method: 'PUT',
      headers: {
        authToken
      },
      data: {},
      url: `/user/wishlist/${productId}`
    })
  }

  // ?????????????????????
  createCashOrder (COD, isCoupon, authToken) {
    return api.request({
      method: 'POST',
      headers: {
        authToken
      },
      data: { couponApplied: isCoupon, COD },
      url: '/user/cash-order'
    })
  }
}

export default new API();
