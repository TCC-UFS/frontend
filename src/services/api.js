import axios from 'axios';

var api = axios.create({
  baseURL: 'http://localhost:3000/api'
});


const setAuthToken = (userId) => {
  api.defaults.headers.common["x-user-id"] = `${userId}`;
}

const clearAuthToken = () => {
  api.defaults.headers.common["x-user-id"] = null;
}

const getBasic = () => {
  return api.get('/basic?from=bZelXcVrsRHHYVCdwaT7dvECG5vxpX3KdWAFmwI8zyugl2Ovhjp34aefkBRlduAUNzZlVZ08STr6xU20JTscwkcRW3dFScuuTjjJjFVB4kTuezpam9uhDJDBQ37PITH2rVriJXc958uPEfvmPAXwwEwazjgiKfXuRJ2ETZmdMzwoD6iEGZv6xIu7qg5WfbRF6s1LpriNQ2ZND0dguPrKMDfofwSG10UzIaJ2CoCJpshgytXIF2DZNMaoQ0vUkA7pDEacsmJf4POx2wSgKw6KHxJJTJCn8TUIpcf8FQIQS2tlV27zPoV5Eho7IQFlo9mR')
  .then(res => {
    return res.data;
  }).catch(err => console.log(err));
}

const login = async (userName) => {
  return api.post('/login', { userName }, { headers: { "Content-Type": "application/json" } }).then(res => {
    if (res.data.id)
      setAuthToken(res.data.id);

    return res;
  }).catch(err => { throw new Error(err.response?.data?.error || err.message) });
}

const logout = async () => {
  return api.post('/logout').then(_ => {
    clearAuthToken(null);
  }).catch(err => { console.log(err); throw new Error(err.response?.data?.error || err.message) });
}

const sendMessage = async (message, to, userId) => {
  return api.post('/message', { to, message }, { headers: { "Content-Type": "application/json", "x-user-id": userId } })
            .catch(err => { throw new Error(err.response?.data?.error || err.message) });
}

const listChats = async (userId) => {
  return api.get('/chats', { headers: { "x-user-id": userId } })
  .then(res => {
    return res.data;
  })
  .catch(err => { throw new Error(err.response?.data?.error || err.message) });
}

export { api, login, logout, sendMessage, listChats, getBasic }
