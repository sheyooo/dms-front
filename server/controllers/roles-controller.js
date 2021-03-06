(() => {
  'use strict';

  var Role = require('./../models/Role.js').model;

  module.exports = {
    create: (req, res) => {
      var newRole = req.body,
        role = new Role(newRole);

      role.save(err => {
        if (err) {
          res
            .status(409)
            .json({status: err.toString()});
        } else {
          res
            .status(201)
            .json(role);
        }
      });
    },

    getAll: (req, res) => {
      Role.find()
        .exec((err, roles) => {
          res.json(roles);
        });
    }
  };
})();
