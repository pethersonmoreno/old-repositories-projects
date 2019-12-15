import axios from '../axios';

const isValidEmail = token =>
  axios
    .get('/isValidEmail', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.data);

export default isValidEmail;
