const cors = require('cors');
const httpStatus = require('http-status');
const Error = require('../errors/Error');
const whiteListCors = require('../config/whiteListCors');

const corsOptions = {
  origin(origin, callback) {
    if (whiteListCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error({
          status: httpStatus.BAD_REQUEST,
          message: 'Not allowed by CORS'
        })
      );
    }
  }
};

module.exports = cors(corsOptions);
