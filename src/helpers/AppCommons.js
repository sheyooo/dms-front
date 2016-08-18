import Api from './ApiClient';

let commons = {
  getRoles: (callback) => {
    // Get all available Roles
    Api('get', '/roles')
      .end((err, res) => {
        if (res) {
          callback(res.body);
        } else {
          callback([]);
        }
      });


  },

  getDocTypes: (callback) => {
    // Get all available DocTypes
    Api('get', '/doc-types')
      .end((err, res) => {
        if (res) {
          callback(res.body);
        } else {
          callback([]);
        }
      });
  }
};

export default commons;
