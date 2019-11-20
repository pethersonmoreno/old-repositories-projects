import axios from './axios';

const getList = token =>
  axios
    .get('/people', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

const peopleApi = {
  getList
};
export default peopleApi;
