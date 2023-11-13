/* eslint-disable no-console */

const errorRequest = (e, req) => {
  console.log('----errorRequest----');
  console.error(e, req);
  console.log('--------------------');
};

const info = (message) => {
  console.info('-LOG INFO-', message);
};

export default {
  errorRequest,
  info,
};
