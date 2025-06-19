module.exports = app => {
  const Website = require('../../controllers/website.controller');
  const validation = require('../../middleware/validation.middleware');

  const router = require('express').Router();
  router.post('/early-access', validation.earlyAccess, Website.earlyAccess);
  router.post('/contact-us', validation.contactUs, Website.contactUs);

  app.use('/api/website', router);
};
