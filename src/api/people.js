import axios from './axios';

const getList = token =>
  axios
    .get('/people', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

const add = (token, people) =>
  axios
    .post('/people', people,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(resp => resp.data);

const peopleApi = {
  getList,
  add
};
export default peopleApi;
