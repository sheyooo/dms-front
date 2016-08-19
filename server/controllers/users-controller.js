(() => {
  'use strict';

  var User = require('./../models/User.js').model,
    Document = require('./../models/Document.js').model,
    Role = require('./../models/Role.js').model,
    bcrypt = require('bcrypt-nodejs'),
    util = require('./utilities.js');

  module.exports = {
    createUser: (req, res) => {
      var newUser = req.body;
      var userRole = newUser.role;
      newUser.role = '';

      Role.findOne({title: userRole}, (err, role) => {
        if (role) {
          newUser.role = role.title;
          User.create(newUser, (err, user) => {
            if (err) {
              if (err.name === 'ValidationError') {
                res
                  .status(400)
                  .json({status: 'Please check your ' + err.message});
                  return;
              }
              res
                .status(409)
                .json({status: 'User conflict'});
            } else {
              res
                .status(201)
                .json({token: util.createJWT(user), user});
            }
          });
        } else {
          res
            .status(400)
            .json({status: 'No such role defined!'});
        }
      });
    },

    login: (req, res) => {
      var loginDetails = {
        username: req.body.username,
        password: req.body.password
      };

      var checkPassword = (user) => {
        if (user && bcrypt.compareSync(loginDetails.password, user.password)) {
          res.json({token: util.createJWT(user)});
        } else {
          res.status(401)
            .json({status: 'Failed'});
        }
      };

      User.findOne({username: loginDetails.username}, (err, user) => {
        if (user) {
          checkPassword(user);
        } else {
          User.findOne({email: loginDetails.username}, (err, user) => {
            if (user) {
              checkPassword(user);
            } else {
              res
                .status(404)
                .json({status: 'User not found'});
            }
          });
        }
      });
    },

    getUser: (req, res) => {
      var id = req.params.id;

      User.findById(id, (err, user) => {
        if (err) {
          res
            .status(404)
            .json({status: 'User not found'});
        } else {
          res.json(user);
        }
      });
    },

    getAllUsers: (req, res) => {
      var params = req.query,
        paginatedUsers = util.paginate(params, User.find());

      paginatedUsers
        .exec((err, users) => {
          if (users){
            res.json({ data: users });
          } else {
            res.json({ data: [] });
          }
        });
    },

    updateUser: (req, res) => {
      var id = req.params.id;

      User.findById(id, (err, user) => {
        if (!user && user._id === req.jwtUser._id) {
          res
            .status(404)
            .json({status: 'User not found'});
        } else {
          user.update({$set: req.body}, (err) => {
            if (err) {
              res
                .status(400)
                .json({status: 'Something is wrong', error: err});
            } else {
              res.json({status: 'Successfuly updated'});
            }
          });
        }
      });
    },

    getUserDocuments: (req, res) => {
      var id = req.params.id;

      User.findById(id, (err, user) => {
        if (user) {
          Document
            .find()
            .populate('ownerId')
            .sort({'updatedAt': 'desc'})
            .where('ownerId')
            .equals(id)
            .exec((err, docs) => {
              if (docs) {
                res.json({data: docs});
              } else {
                res.json({status: 'Error'});
              }
            });
        } else {
          res
            .status(404)
            .json({status: 'User not found'});
        }
      });
    },

    updatePassword: (req, res) => {

      if (req.jwtUser) {
        if (
          req.body.oldPassword.length > 6 &&
          req.body.newPassword.length > 6
        ) {
          User.findById(req.jwtUser._id, (err, user) => {
            if (
              user && bcrypt.compareSync(req.body.oldPassword, user.password)
            ) {
              user.password = req.body.newPassword;
              user.save();
              res.json({status: 'Successfuly updated'});
            } else {
              res
                .status(400)
                .json({status: 'Incorrect password'});
            }

          });
        } else {
          res
            .status(400)
            .json({status: 'Bad passwords'});
        }
      }
    }
  };
})();
