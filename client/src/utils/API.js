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
      url: '/categroies'
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
      body: {
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
      body: {
        name: category,
      }
    })
  }
}

export default new API();
