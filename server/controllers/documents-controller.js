(() => {
  'use strict';

  var Document = require('./../models/Document.js').model,
    Role = require('./../models/Role.js').model,
    Utilities = require('./../controllers/utilities.js');

  module.exports = {
    create: (req, res) => {
      var newDoc = req.body;

      newDoc.ownerId = req.decodedJWT.sub;

      Role.findOne({title: newDoc.role}, (err, foundRole) => {
        if (!foundRole) {
          newDoc.role = 'viewer';
        }

        Document.create(newDoc, (err, doc) => {
          if (err) {
            res
              .status(400)
              .json({status: 'Could not create document', error: err});
          } else {
            res
              .status(201)
              .json(doc);
          }
        });

      });
    },

    getDoc: (req, res) => {
      var id = req.params.id;

      Document.findById(id)
        .populate('ownerId')
        .exec((err, doc) => {
        if (!doc) {
          res
            .status(404)
            .json({status: 'Document not found'});
        } else {
          if (Utilities.checkDocAccessRight(req.jwtUser, doc)) {
            res.json(doc);
          } else {
            res
              .status(401)
              .json({status: 'You cant touch that'});
          }
        }
      });
    },

    getAllDocs: (req, res) => {
      var params = req.query,
        paginatedDocs = Utilities.paginate(params, Document.find());

      paginatedDocs
        .populate('ownerId')
        .sort({'updatedAt': 'desc'})
        .exec((err, docs) => {
          if (err) {
            res
              .status(400)
              .json({status: 'Error', error: err});
          } else {
            res.json({
              data: docs
            });
          }
        });
    },

    update: (req, res) => {
      var docID = req.params.id,
        newDoc = req.body,
        userID = req.decodedJWT.sub;

      Document.findById(docID, (err, foundDoc) => {
        if (!foundDoc) {
          res
            .status(404)
            .json({status: 'Document not found'});
          return;
        }

        if (foundDoc.ownerId.toString() === userID) {
          foundDoc.update(newDoc, err => {
            if (err) {
              res
                .status(400)
                .json({status: 'Error editing document'});
            } else {
              var finalDoc = Utilities.mergeObjects(foundDoc, newDoc);
              res.json(finalDoc);
            }
          });
        } else {
          res
            .status(401)
            .json({status: 'Document does not belong to you!'});
        }
      });
    },

    delete: (req, res) => {
      var id = req.params.id,
        userID = req.decodedJWT.sub;

      Document.findById(id, (err, doc) => {
        if (!doc) {
          res
            .status(404)
            .json({status: 'Something went wrong'});
        } else{
          if (doc.ownerId.toString() === userID) {
            doc.remove();
            res.json({status: 'Successfuly deleted'});
          } else {
            res
              .status(401)
              .json({status: 'This document does not belong to you!'});
          }
        }
      });
    }
  };

})();
