import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import ViewDocPage from './../pages/ViewDocPage';
import { browserHistory } from 'react-router';
import fakeData from './../tests-helpers/fakeData';

describe('VIEW DOCUMENT COMPONENT:', function() {
  var component;

  before(() => {
    AuthHelper.__Rewire__('storage', () => fakeData.token);

    component = mount(<ViewDocPage params={{docID: fakeData.aDoc._id}} />);
  });

  after(() => {
    browserHistory.push.restore();
  });

  it('should load the document into the state', function() {
    expect(component.state('document')).to.equal(fakeData.aDoc);
  });

  it('should redirect an un-authenticated user', function() {
    AuthHelper.__Rewire__('storage', () => null);
    sinon.stub(browserHistory, 'push');
    AuthHelper.__Rewire__('browserHistory', browserHistory);
    mount(<ViewDocPage />);
    expect(browserHistory.push.calledWith('/login')).to.be.ok;
  });

});
