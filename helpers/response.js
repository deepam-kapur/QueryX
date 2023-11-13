const success = (res, payload = null, message = 'Success!', code = 200) => {
  const responseData = {
    success: true,
    message,
    payload,
  };
  return res.status(code).send(responseData);
};

const error = (res, payload, message = 'Some error Occurred', code = 400) => {
  const responseData = {
    success: false,
    message,
    payload,
  };
  return res.status(code).send(responseData);
};

export default {
  success,
  error,
};
