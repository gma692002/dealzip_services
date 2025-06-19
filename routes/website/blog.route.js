module.exports = app => {
  const Website = require('../../controllers/website.controller');

  const router = require('express').Router();
  router.post('/blog-list', Website.findAll);
  router.post('/blog-detail', Website.blogDetail);
  router.post('/save-view', Website.saveView);

  app.use('/api/blog', router);
};
