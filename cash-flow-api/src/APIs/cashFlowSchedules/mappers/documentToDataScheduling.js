const moment = require('moment');
const mapDocumentToData = require('../../../mappers/documentToData');

const mapDocumentToDataScheduling = doc => {
  const data = mapDocumentToData(doc);
  data.nextDate = moment(data.nextDate)
    .utc()
    .format('YYYY-MM-DD');
  return data;
};

module.exports = mapDocumentToDataScheduling;
