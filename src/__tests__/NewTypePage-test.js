import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import NewTypePage from './../pages/NewTypePage';
import { browserHistory } from 'react-router';
import fakeData from './../tests-helpers/fakeData';

describe('DOC TYPE PAGE COMPONENT:', function() {
  var component;

  before((done) => {
    AuthHelper.__Rewire__('storage', () => fakeData.token);

    component = mount(<NewTypePage />);
    setTimeout(() => {
      done();
    }, 500);
  });

  after(() => {
    browserHistory.push.restore();
  });

  it('should load the doc types into the state', function() {
    expect(component.state('docTypes')).to.equal(fakeData.docTypes);
  });

  it('should not allow empty field', function() {
    component.find('form').simulate('submit', {target: {preventDefault: sinon.stub()}});

    expect(toastr.error.calledWith('Doc Type title cannot be empty')).to.be.ok;
  });

  it('should submit filled field', function(done) {
    component.find('input').simulate('change', {target: {value: 'hello'}});

    component.find('form').simulate('submit', {target: {preventDefault: sinon.stub()}});

    setTimeout(() => {
      expect(toastr.success.calledWith('Role added')).to.be.ok;
      done();
    }, 500);
  });

  it('should redirect an un-authenticated user', function() {
    AuthHelper.__Rewire__('storage', () => null);
    sinon.stub(browserHistory, 'push');
    AuthHelper.__Rewire__('browserHistory', browserHistory);
    mount(<NewTypePage />);
    expect(browserHistory.push.calledWith('/login')).to.be.ok;
  });

});
