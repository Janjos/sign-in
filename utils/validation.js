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

const validateUserName = (name) => {
  const namePattern = new RegExp(/^[A-z À-ú]+$/);
  const nameIsValid = name.match(namePattern);

  return nameIsValid;
};

exports.validateEmail = validateEmail;
exports.validatePhone = validatePhone;
exports.validateUserName = validateUserName;
