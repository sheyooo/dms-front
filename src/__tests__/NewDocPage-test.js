import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import NewDocPage from './../pages/NewDocPage';
import { browserHistory } from 'react-router';
import fakeData from './../tests-helpers/fakeData';

describe('CREATE NEW DOCUMENT COMPONENT:', function() {
  var component;

  before(() => {
    AuthHelper.__Rewire__('storage', () => fakeData.token);
    sinon.stub(browserHistory, 'push');
    NewDocPage.__Rewire__('browserHistory', browserHistory);

    component = mount(<NewDocPage />);
  });

  after(() => {
    browserHistory.push.restore();
  });

  it('should not create a new document if empty', function() {
    component.find('form').simulate('submit', {
      target: {},
      preventDefault: sinon.stub()
    });

    expect(toastr.error.calledWith('You must fill in necessary fields'))
      .to.be.ok;
  });

  it('should create new document', function(done) {
    NewDocPage.__Rewire__('browserHistory', browserHistory);

    component.find('input[name=\'title\']').simulate('change', {target: {
      value: 'A doc title'}
    });
    component.setState({content: 'Heya'});

    // Wait for changes to propagate
    setTimeout(() => {
      component.find('form').simulate('submit', {
        target: {},
        preventDefault: sinon.stub()
      });
      // Wait for changes to propagate
      setTimeout(() => {
        expect(toastr.success.calledWith('Successfuly created your document'))
          .to.be.ok;
        expect(browserHistory.push.called).to.be.ok;
        done();
      }, 500);
    }, 500);
  });

  it('should redirect an un-authenticated user', function() {
    AuthHelper.__Rewire__('storage', () => null);

    AuthHelper.__Rewire__('browserHistory', browserHistory);
    mount(<NewDocPage />);
    expect(browserHistory.push.calledWith('/login')).to.be.ok;
  });

});
