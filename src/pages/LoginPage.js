import React from 'react';
import { Link, browserHistory } from 'react-router';
import BareLayout from './../containers/BareLayout';
import CenterLayoutNoAuth from './../containers/CenterLayoutNoAuth';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.inputChange = this.inputChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.runValidation = this.runValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
  }

  componentDidMount() {
    if (AuthHelper.loginIfAuthed()) {
      return ;
    }
  }

  inputChange(e) {
    this.setState({username: e.target.value})
  }

  passwordChange(e) {
    this.setState({password: e.target.value})
  }

  runValidation() {
    let errors = [];

    this.setState({errors});

    if (!this.state.username) {
      errors.push('Username field is required');
      this.setState({errors})
    }

    if (this.state.password.length < 6) {
      errors.push('Password field must be more than 6 characters');
      this.setState({errors})
    }

    return errors.length ? false : true;
  }

  handleSubmit(e) {
    e.preventDefault();

    let username = this.state.username,
      password = this.state.password;

    if (this.runValidation()) {
      AuthHelper.login({
        username,
        password
      }, (token) => {
        if (token) {
          browserHistory.push('/dashboard');
        } else {
          toastr.warning('Wrong password or username');
        }
      });
    } else {
      toastr.warning('Please check the login form');
    }

    return false;
  }

  render() {
    return(
      <div>
        <div className='about-overlay'>
          <img src='img/drake-signup.png' />
          <div></div>
        </div>
        <CenterLayoutNoAuth>
          <div className='ui centered grid' style={{marginTop: '60px'}}>

            <div className='column center aligned'>
              <h2 className='ui black image header'>
                <img src='img/ovo.png' className='image' />
                <div className='content' style={{color: '#fff'}}>
                  Log in to your account
                </div>
              </h2>
              <form className={'ui large form ' + (this.state.errors.length ? 'error' : '')} id='login-form' onSubmit={this.handleSubmit}>
                <div className='ui stacked segment'>
                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='user icon'></i>
                      <input onChange={this.inputChange} name='username' type='text' placeholder='E-mail address' />
                    </div>
                  </div>
                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='lock icon'></i>
                      <input onChange={this.passwordChange} name='password' type='password' placeholder='Password' />
                    </div>
                  </div>

                  <button type='submit' className='ui fluid large green button'>Log in</button>
                </div>

                <div className='ui error message'>
                  <ul>
                    {this.state.errors.map((err) => {
                      return <li key={err}>{err}</li>;
                    })}
                  </ul>
                </div>

              </form>

              <div className='ui message'>
                New to us? <Link to='signup'>Sign Up</Link>
              </div>
            </div>

          </div>

        </CenterLayoutNoAuth>
      </div>
    )
  }
}

export default LoginPage;
