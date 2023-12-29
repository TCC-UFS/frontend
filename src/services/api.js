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

const login = async (userName) => {
  return api.post('/login', { userName }, { headers: { "Content-Type": "application/json" } }).then(res => {
    if (res.data.id)
      setAuthToken(res.data.id);

    return res;
  }).catch(err => { throw new Error(err.error) });
}

const logout = async () => {
  return api.post('/logout').then(_ => {
    clearAuthToken(null);
  }).catch(err => { throw new Error(err.error) });
}

const sendMessage = async (message, to, userId) => {
  return api.post('/message', { to, message }, { headers: { "Content-Type": "application/json", "x-user-id": userId } });
}

const listChats = async (userId) => {
  return api.get('/chats', { headers: { "x-user-id": userId } })
  .then(res => {
    return res.data;
  })
  .catch(err => { console.log(err); throw new Error(err.error) });
}

export { login, logout, sendMessage, listChats }
