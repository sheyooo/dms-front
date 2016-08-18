import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import AuthHelper from './../helpers/AuthHelper';
import LoginPage from './../pages/LoginPage';
import faker from 'faker';

describe("LOGIN COMPONENT:", function() {
  let shallowComp = shallow(<LoginPage />);

  it("has a signup form", function() {
    expect(shallowComp.find('#login-form').length).to.equal(1);
  });

  describe('Mount', () => {
    let component;

    before(() => {
      AuthHelper.__Rewire__('storage', () => false);
      component = mount(<LoginPage />);
    });

    it('should not submit an incomplete form', () => {
      component.find('input[name="username"]').simulate('change', {target: {value: faker.name.firstName()}});

      component.find('form').simulate('submit', {target: {}, preventDefault: () => {}});

      expect(component.state('errors').length).to.be.above(0);
    });

    it('form should be error free if complete', () => {
      let pass = faker.internet.password();

      component.find('input[name="username"]').simulate('change', {target: {value: faker.name.firstName()}});
      component.find('input[name="password"]').simulate('change', {target: {value: faker.internet.password()}});

      component.find('form').simulate('submit', {target: {}, preventDefault: () => {}});

      expect(component.state('errors').length).equal(0);
    });

  });
});
