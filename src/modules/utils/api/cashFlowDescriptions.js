import queryString from 'query-string';
import axios from './axios';

const getList = (token, query = {}) =>
  axios
    .get(`/cashFlowDescriptions?${queryString.stringify(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

const get = (token, id) =>
  axios
    .get(`/cashFlowDescriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);


const add = (token, cashFlowDescription) =>
  axios
    .post('/cashFlowDescriptions', cashFlowDescription,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const replace = (token, id, cashFlowDescription) =>
  axios
    .put(`/cashFlowDescriptions/${id}`, cashFlowDescription,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);


const deleteRequest = (token, id) =>
  axios
    .delete(`/cashFlowDescriptions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const cashFlowDescriptionsApi = {
  getList,
  get,
  add,
  replace,
  delete: deleteRequest
};
export default cashFlowDescriptionsApi;
