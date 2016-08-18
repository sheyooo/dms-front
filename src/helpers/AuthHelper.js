import storage from 'local-storage';
import Api from './ApiClient';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';

const AuthHelper = {
  login: (loginDetails, callback) => {
    Api('post', '/users/login')
      .send(loginDetails)
      .end((err, res) => {
        if (res.status === 200) {
          storage('token', res.body.token);
          callback(res.body.token);
          return ;
        }

        callback(false);
      });
  },

  signup: (userDetails, callback) => {
    Api('post', '/users')
      .send(userDetails)
      .end((err, res) => {
        if (res.status === 201) {
          storage('token', res.body.token);
          callback(res.body.token);
          return ;
        }

        callback(false);
      });
  },

  logout: () => {
    storage.remove('token');
  },

  token: () => {
    if (!storage('token')) {
      return false;
    }
    return jwtDecode(storage('token'));
  },

  logoutIfUnauthed: () => {
    if (!storage('token')) {
      browserHistory.push('/login');
      setTimeout(() => {
        toastr.warning('You are not logged in!');
      }, 1000);
      return true;
    } else {
      return false;
    }
  },

  loginIfAuthed: () => {
    if (storage('token')) {
      browserHistory.push('/dashboard');
      return true;
    } else {
      return false;
    }
  }
}

export default AuthHelper;
