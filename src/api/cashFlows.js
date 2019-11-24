import queryString from 'query-string';
import axios from './axios';

const getList = (token, query = {}) =>
  axios
    .get(`/cashFlows?${queryString.stringify(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

const get = (token, id) =>
  axios
    .get(`/cashFlows/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);


const add = (token, registry) =>
  axios
    .post('/cashFlows', registry,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const replace = (token, id, registry) =>
  axios
    .put(`/cashFlows/${id}`, registry,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);


const deleteRequest = (token, id) =>
  axios
    .delete(`/cashFlows/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const cashFlowsApi = {
  getList,
  get,
  add,
  replace,
  delete: deleteRequest
};
export default cashFlowsApi;
