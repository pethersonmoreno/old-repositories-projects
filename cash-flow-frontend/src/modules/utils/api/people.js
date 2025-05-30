// import queryString from 'query-string';
// import { firestore } from './firebase';
import axios from './axios';
import getDocumentListPaginated from './firebaseUtil/getDocumentListPaginated';
import getDocument from './firebaseUtil/getDocument';

const getList = async (token, query = {}) => {
  const {
    page = 1,
    perPage = 100,
    orderBy = null,
    orderByDirection = null
  } = query;
  return getDocumentListPaginated('people', page, perPage, orderBy, orderByDirection);
};

const get = (token, id) =>
  getDocument('people', id);


const add = (token, person) =>
  axios
    .post('/people', person,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const replace = (token, id, person) =>
  axios
    .put(`/people/${id}`, person,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);


const deleteRequest = (token, id) =>
  axios
    .delete(`/people/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const peopleApi = {
  getList,
  get,
  add,
  replace,
  delete: deleteRequest
};
export default peopleApi;
