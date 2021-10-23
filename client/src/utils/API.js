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

  // 商品CRUD
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

  // 商品をいくら取得するか、並び順の変更
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

  // 画像の追加と削除
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

  // レビュー更新
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
  // 関連商品の取得
  getRelatedProducts (productId) {
    return api.request({
      method: 'GET',
      headers: {},
      url: `/product/related/${productId}`,
      data: {},
    })
  }
  // テキストで検索をかける
  fetchProductsByFilter (query) {
    return api.request({
      method: 'POST',
      headers: {},
      url: '/search/filter',
      data: query
    })
  }

  // カート情報をDBに保存する
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

  // カート情報を表示
  getCart (authToken) {
    return api.request({
      method: 'GET',
      headers: {
        authToken
      },
      url: '/user/cart'
    })
  }

  // カート情報を削除
  removeCart (authToken) {
    return api.request({
      method: 'Delete',
      headers: {
        authToken
      },
      url: '/user/cart'
    })
  }

  // 住所を登録する
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

  // クーポン作成
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

  // クーポン一覧取得
  listCoupons () {
    return api.request({
      method: 'GET',
      url: '/coupons',
    })
  }

  // クーポン削除
  deleteCoupon (couponId, authToken) {
    return api.request({
      method: 'DELETE',
      headers: {
        authToken
      },
      url: `/coupon/${couponId}`
    })
  }

  // クーポンの適用
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

  // 支払い情報をバックエンドに渡す
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

  // オーダーを作成する
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

  // 注文履歴を表示
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

  // 管理画面で注文情報取得
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

  // 注文のステータスを更新する
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

  // wishlist追加
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

  // wishlist取得
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

  // wishlist削除
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

  // 代引き注文作成
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
