(() => {
  'use strict';

  // Load Up all API routes
  module.exports = (api, app) => {
    // <API>
    require('./users.js')(api);
    require('./documents.js')(api);
    require('./roles.js')(api);
    require('./doc-types.js')(api);
    // </API>

    // <FRONTEND>
    require('./frontend.js')(app);
    // </FRONTEND>
  };
})();
