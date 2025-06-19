const validator = require('../helper/validate.helper');

const earlyAccess = (req, res, next) => {
  const validationRule = {
    email: 'required|email',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const contactUs = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email: 'required|email',
    message: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  earlyAccess,
  contactUs,
};
