import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import ProfilePage from './../pages/ProfilePage';
import { browserHistory } from 'react-router';
import fakeData from './../tests-helpers/fakeData';

describe('VIEW PROFILE COMPONENT:', function() {
  var component;

  before((done) => {
    AuthHelper.__Rewire__('storage', () => fakeData.token);

    component = mount(<ProfilePage />);
    setTimeout(() => {
      done();
    }, 500);
  });

  after(() => {
    browserHistory.push.restore();
  });

  it('should load the profile into the state', function() {
    expect(component.state('firstname')).to.equal(fakeData.profile.name.first);
    expect(component.state('lastname')).to.equal(fakeData.profile.name.last);
    expect(component.state('email')).to.equal(fakeData.profile.email);
    expect(component.state('username')).to.equal(fakeData.profile.username);
  });

  it('should not submit empty fields', function(done) {
    component.setState({
      firstname: '',
      lastname: '',
      email: '',
      username: ''
    });

    component.find('form#detail-form').simulate('submit', {target: {
      preventDefault: sinon.stub()}
    });

    setTimeout(() => {
      expect(toastr.error.calledWith('All fields must be filled')).to.be.ok;
      done();
    }, 700);
  });


  it('should submit complete form', function(done) {
    component.setState({
      firstname: 'Helen',
      lastname: 'Mosigisi',
      email: 'driz@dro.com',
      username: 'wizzy'
    });

    component.find('form#detail-form').simulate('submit', {target: {
      preventDefault: sinon.stub()}
    });

    setTimeout(() => {
      expect(toastr.success.calledWith('Successfuly updated profile')).to.be.ok;
      done();
    }, 1500);
  });

  it('update pass button should bring up password modal', function() {
    component.find('#password-button').simulate('click');

    expect($().modal.calledWith('show')).to.be.ok;

    setTimeout(() => {
      expect(toastr.error.calledWith('All fields must be filled')).to.be.ok;
    }, 1000);
  });


  it('should redirect an un-authenticated user', function() {
    AuthHelper.__Rewire__('storage', () => null);
    sinon.stub(browserHistory, 'push');
    AuthHelper.__Rewire__('browserHistory', browserHistory);
    mount(<ProfilePage />);
    expect(browserHistory.push.calledWith('/login')).to.be.ok;
  });

});
