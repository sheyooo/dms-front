require('babel-register')({
  plugins: ['babel-plugin-rewire']
});

var sinon = require('sinon');

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
global.window.$ = require('jquery');
global.window.toastr = {
  success: sinon.stub(),
  error: sinon.stub(),
  warning: sinon.stub()
};
global.window.tinymce = {init: sinon.stub()};

global.window.$.fn.extend({
  dropdown: sinon.stub(),
  modal: sinon.stub(),
});

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

//documentRef = document;
