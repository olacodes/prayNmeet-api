const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  userLogin,
} = require('../controllers/userControllers');
const { checkBody } = require('../middlewares/userMiddlewares');
const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
.route('/:id')
.get(getUser)


router.route('/login').post(checkBody, userLogin);
// router.route('/:id/logout').post(userLogOut)

module.exports = router;
