const Joi = require('@hapi/joi');

const leanYearsRegex =
  '((([0-9]{2})(04|08|[2468][048]|[13579][26]))|((00|(04|08|[2468][048]|[13579][26]))00))';

// Todos os meses com 31º dia
const allMonthsWith31thDayRegex = '([0-9]{4}-(0[13578]|1[02])-31)';
// Todos os meses com os 29º e 30º dias)
const allMonthsWith30thDayRegex = '([0-9]{4}-(0[13-9]|1[1-2])-(29|30))';
// Todos os meses com os dias 1 até 28
const allMonthsWith28thDayRegex =
  '([0-9]{4}-(0[1-9]|1[0-2])-([01]9|[12]0|[0-2][1-8]))';
// Todos os meses de fevereiro com 29º dia
const allFebruaryMonthsWith29thDayRegex = `(${leanYearsRegex}-02-29)`;

const regex = new RegExp(
  `^((${allMonthsWith31thDayRegex})|(${allMonthsWith30thDayRegex})|(${allMonthsWith28thDayRegex})|(${allFebruaryMonthsWith29thDayRegex}))$`
);

module.exports = Joi.string().regex(regex, 'date only');
