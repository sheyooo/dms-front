import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import superagent from 'superagent';
import Api from './../helpers/ApiClient';
import mock from 'superagent-mocker';
import AuthHelper from './../helpers/AuthHelper';
import DashboardPage from './../pages/DashboardPage';
import { browserHistory } from 'react-router';
import fakeData from './../tests-helpers/fakeData';

var mockServer = mock(superagent);

mockServer.timeout = 0;

mockServer.get('/api/v1/documents', (req) => {
  return {
    body: fakeData.docs
  }
});

mockServer.get('/api/v1/users/:id/documents', (req) => {
  return {
    body: fakeData.docs
  }
});

mockServer.get('/api/v1/roles', (req) => {
  return {
    body: fakeData.roles
  }
});

mockServer.post('/api/v1/roles', (req) => {
  return {
    body: fakeData.aRole
  }
});

mockServer.get('/api/v1/doc-types', (req) => {
  return {
    body: fakeData.docTypes
  }
});

mockServer.post('/api/v1/doc-types', (req) => {
  return {
    body: fakeData.aType
  }
});

mockServer.get('/api/v1/users/:id', (req) => {
  return {
    body: fakeData.profile
  }
});

mockServer.put('/api/v1/users/:id', (req) => {
  return {
    body: {status: 'Successfuly updated'}
  }
});

mockServer.get('/api/v1/documents/:id', (req) => {
  return {
    body: fakeData.aDoc
  }
});

mockServer.post('/api/v1/documents', (req) => {
  return {
    body: fakeData.aDoc
  }
});

mockServer.del('/api/v1/documents/:id', (req) => {
  return {
    body: {status: 'Successfuly deleted'}
  }
});

Api.__Rewire__('superagent', superagent);

//sinon.stub(browserHistory, 'push');
//AuthHelper.__Rewire__('browserHistory', browserHistory);
