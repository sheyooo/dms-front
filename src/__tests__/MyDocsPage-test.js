import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import MyDocsPage from './../pages/MyDocsPage';
import { browserHistory } from 'react-router';
import fakeData from './../tests-helpers/fakeData';

describe('MY DOCS COMPONENT:', function() {
  var component;

  before((done) => {
    AuthHelper.__Rewire__('storage', () => fakeData.token);

    component = mount(<MyDocsPage />);
    setTimeout(() => {
      done();
    }, 500);
  });

  after(() => {
    browserHistory.push.restore();
  });

  it('should load documents into the state', function() {
    expect(component.state('documents')).to.equal(fakeData.docs.data);
  });

  it('should redirect an un-authenticated user', function() {
    AuthHelper.__Rewire__('storage', () => null);
    sinon.stub(browserHistory, 'push');
    AuthHelper.__Rewire__('browserHistory', browserHistory);
    mount(<MyDocsPage />);
    expect(browserHistory.push.calledWith('/login')).to.be.ok;
  });

});
