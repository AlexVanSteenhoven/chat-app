const moment = require('moment');

let genMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment.valueOf()
  }
};

module.exports = {genMessage};