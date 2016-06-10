(function () {
  'use strict';
  var mongoose = require('mongoose'),

    TypeSchema = mongoose.Schema({
      title: {type: String, unique: true, required: true}
    }),
    
    Type = mongoose.model('Type', TypeSchema);

  module.exports = { model: Type, schema: TypeSchema };
})();