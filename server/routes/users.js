(() => {
  'use strict';

  var UserController = require('./../controllers/users-controller.js'),
    jwtMiddleware = require('./../middleware/jwt.js').requireAuth;

  module.exports = router => {
    router.post('/users/login', UserController.login);

    router.post('/users/logout', (req, res) => {
      res.json({status: 'Logged out!'});
    });

    router.post('/users', UserController.createUser);

    router.get('/users', UserController.getAllUsers);

    router.get('/users/:id', UserController.getUser);

    router.put('/users/:id', jwtMiddleware, UserController.updateUser);

    router.put('/me/password', jwtMiddleware, UserController.updatePassword);
  };
})();
