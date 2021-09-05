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
}

export default new API();
