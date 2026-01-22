module.exports = app => {
  const offices = require("../controllers/OfficeController.js");
  const passport = require("passport");

  var router = require("express").Router();
  router.get('/fetch/offices',offices.getOffices)
  router.get('/fetch/officers',offices.getOfficers)
  router.post('/create/offices',offices.createOfficeOneMany)
  router.post('/create/officers',offices.createOfficersOneOrMany)
  router.post('/portfolio',offices.submitPortfolio)
  app.use(
    '/api/office',
    passport.authenticate('jwt', { session: false }),
    router
  );
}