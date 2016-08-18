import React from 'react';
import { Link, browserHistory } from 'react-router';
import BareLayout from './../containers/BareLayout';
import CenterLayoutNoAuth from './../containers/CenterLayoutNoAuth';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';
import AppCommons from './../helpers/AppCommons';

class SignupPage extends React.Component {
  constructor() {
    super();
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.selectRoleChange = this.selectRoleChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.runValidation = this.runValidation.bind(this);
    this.state = {
      email: '',
      role: '',
      username: '',
      password: '',
      rPassword: '',

      roles: [],
      errors: []
    };
  }

  componentDidMount() {
    if (AuthHelper.loginIfAuthed()) {
      return ;
    }

    AppCommons.getRoles((roles) => {
      this.setState({roles});
    });

    $('.ui.dropdown')
      .dropdown();
  }

  firstNameChange(e) {
    this.setState({firstname: e.target.value});
  }

  lastNameChange(e) {
    this.setState({lastname: e.target.value});
  }

  emailChange(e) {
    this.setState({email: e.target.value});
  }

  usernameChange(e) {
    this.setState({username: e.target.value});
  }

  selectRoleChange(e) {
    this.setState({role: e.target.value});
  }

  passwordChange(e) {
    this.setState({password: e.target.value});
  }

  repeatPasswordChange(e) {
    this.setState({rPassword: e.target.value});
  }

  runValidation() {
    let errors = [];

    this.setState({errors});

    if (!this.state.firstname) {
      errors.push('First name is required');
      this.setState({errors})
    }

    if (!this.state.lastname) {
      errors.push('Last name is required');
      this.setState({errors})
    }
    if (!/.+@.+\..+/.test(this.state.email)) {
      errors.push('Input a valid Email');
      this.setState({errors})
    }
    if (!this.state.username) {
      errors.push('Username field is required');
      this.setState({errors})
    }

    if (!this.state.role) {
      errors.push('Select a role');
      this.setState({errors})
    }

    if (this.state.password.length < 6) {
      errors.push('Password should be at least six characters');
      this.setState({errors})
    }

    if (this.state.rPassword !== this.state.password) {
      errors.push('Your passwords dont match');
      this.setState({errors})
    }

    return errors.length ? false : true;
  }

  handleSubmit(e) {
    e.preventDefault();

    let first = this.state.firstname,
      last = this.state.lastname,
      email = this.state.email,
      username = this.state.username,
      role = this.state.role,
      password = this.state.password;

    if (this.runValidation()) {
      AuthHelper.signup({
        name: {
          first,
          last
        },
        email,
        username,
        role,
        password
      }, (token) => {
        if (token) {
          browserHistory.push('/dashboard');
        } else {
          toastr.warning('somethin wong');
        }
      });
    } else {
      toastr.warning('Please check all fields well');
    }
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
                  Create your account
                </div>
              </h2>
              <form className={'ui small form ' + (this.state.errors.length ? 'error' : '')} id='signup-form' onSubmit={this.handleSubmit}>
                <div className='ui stacked segment'>
                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='child icon'></i>
                      <input onChange={this.firstNameChange} name='firstname' type='text' placeholder='First name' />
                    </div>
                  </div>

                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='child icon'></i>
                      <input onChange={this.lastNameChange} name='lastname' type='text' placeholder='Last name' />
                    </div>
                  </div>

                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='at icon'></i>
                      <input onChange={this.emailChange} name='email' type='text' placeholder='E-mail address' />
                    </div>
                  </div>

                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='user icon'></i>
                      <input onChange={this.usernameChange} name='username' type='text' placeholder='Username' />
                    </div>
                  </div>

                  <div className='field'>
                    <select onChange={this.selectRoleChange} name='role' className='ui dropdown'>
                      <option value=''>Select your role</option>
                      {this.state.roles.map((role) => {
                        return <option key={role._id} value={role.title}>{role.title}</option>
                      })}
                    </select>
                  </div>

                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='lock icon'></i>
                      <input onChange={this.passwordChange} name='password' type='password' placeholder='Password' />
                    </div>
                  </div>

                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='lock icon'></i>
                      <input onChange={this.repeatPasswordChange} name='repeatpassword' type='password' placeholder='Repeat password' />
                    </div>
                  </div>
                  <button type='submit' className='ui fluid large green submit button'>Join</button>
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
                Already have an account? <Link to='login'>Log in</Link>
              </div>
            </div>

          </div>

        </CenterLayoutNoAuth>
      </div>
    )
  }
}

export default SignupPage;
