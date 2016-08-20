(() => {
  'use strict';
  var path = require('path');

  module.exports = router => {
    router.get(/^((?!\/api\/v1).)*$/, (req, res) => {
      res.sendFile(path.resolve(__dirname + "/../../public/index.html"));
    });
  };
})();
