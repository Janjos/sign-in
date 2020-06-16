const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = ({ numero, ddd }) => {
  const dddPattern = new RegExp(/(^\d{2})$/);
  const dddIsValid = ddd.match(dddPattern);

  const phonePattern = new RegExp(/(^\d{8,9})$/);
  const phoneIsValid = numero.match(phonePattern);

  return dddIsValid && phoneIsValid;
};

exports.validateEmail = validateEmail;
exports.validatePhone = validatePhone;
