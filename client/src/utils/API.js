import axios from 'axios';

import { REACT_APP_API_URL } from '../constants/App';

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 15000,
  cors: true,
});

class API {
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
}

export default new API();
