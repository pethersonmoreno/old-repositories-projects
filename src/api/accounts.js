import queryString from 'query-string';
import axios from './axios';

const getList = (token, query = {}) =>
  axios
    .get(`/accounts?${queryString.stringify(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

const get = (token, id) =>
  axios
    .get(`/accounts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);


const add = (token, registry) =>
  axios
    .post('/accounts', registry,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const replace = (token, id, registry) =>
  axios
    .put(`/accounts/${id}`, registry,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);


const deleteRequest = (token, id) =>
  axios
    .delete(`/accounts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const accountsApi = {
  getList,
  get,
  add,
  replace,
  delete: deleteRequest
};
export default accountsApi;
