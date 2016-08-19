import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import SignupPage from './../pages/SignupPage';
import faker from 'faker';


describe("SIGNUP COMPONENT:", function() {
  let shallowComp = shallow(<SignupPage />);

  it("has a signup form", function() {
    expect(shallowComp.find('#signup-form').length).to.equal(1);
  });

  describe('Mount', () => {
    let component;

    before(() => {
      AuthHelper.__Rewire__('storage', () => false);
      component = mount(<SignupPage />);
    });

    it('should not submit an incomplete form', () => {
      component.find('input[name="firstname"]').simulate('change', {target: {
        value: faker.name.firstName()}
      });
      component.find('input[name="lastname"]').simulate('change', {target: {
        value: faker.name.lastName()}
      });

      component.find('form').simulate('submit', {
        target: {},
        preventDefault: sinon.stub()
      });

      expect(component.state('errors').length).to.be.above(0);
    });

    it('form should be error free if complete', () => {
      let pass = faker.internet.password();

      component.find('input[name="firstname"]').simulate('change', {target: {
        value: faker.name.firstName()
      }});
      component.find('input[name="lastname"]').simulate('change', {target: {
        value: faker.name.lastName()
      }});
      component.find('input[name="email"]').simulate('change', {target: {
        value: faker.internet.email()
      }});
      component.find('input[name="username"]').simulate('change', {target: {
        value: faker.internet.userName()
      }});
      component.find('select[name="role"]').simulate('change', {target: {
        value: 'viewer'
      }});
      component.find('input[name="password"]').simulate('change', {target: {
        value: pass
      }});
      component.find('input[name="repeatpassword"]').simulate('change', {
        target: { value: pass }
      });

      component.find('form').simulate('submit', {
        target: {},
        preventDefault: sinon.stub()
      });

      expect(component.state('errors').length).equal(0);
    });

  });
});
