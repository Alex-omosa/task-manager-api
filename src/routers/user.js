const express = require('express');
const multer = require('multer');
const controller = require('./../controllers/userController');
const auth = require('./../middleware/auth');
const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  },
});

router.route('/signup').post(controller.signUp);
router
  .route('/me')
  .get(auth, controller.readProfile)
  .delete(auth, controller.deleteProfile)
  .patch(auth, controller.updateProfile);
router
  .route('/me/avatar')
  .post(
    auth, //Authenticate
    upload.single('avatar'), //Middleware
    controller.uploadAvater, //Route Handler
    (error, req, res, next) => {
      res.status(400).send({ err: error.message }); //ERROR Handler
    }
  )
  .get(auth, controller.readAvater)
  .delete(auth, controller.deleteAvatar);
router.route('/login').post(controller.login);
router.route('/logout').post(auth, controller.logout);
router.route('/logoutall').post(auth, controller.logoutAll);

module.exports = router;
