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
