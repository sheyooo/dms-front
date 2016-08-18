import React from 'react';
import MainLayout from './../containers/MainLayout';
import {Link} from 'react-router';
import AppCommons from './../helpers/AppCommons';
import AuthHelper from './../helpers/AuthHelper';
import Api from './../helpers/ApiClient';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.oldPasswordChange = this.oldPasswordChange.bind(this);
    this.newPasswordChange = this.newPasswordChange.bind(this);
    this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
    this.changePasswordModal = this.changePasswordModal.bind(this);

    this.state = {
      oldPassword: '',
      newPassword: '',
      rNewPassword: '',
      roles: [],
      docTypes: []
    };
  }

  componentDidMount() {
    if (AuthHelper.logoutIfUnauthed()) {
      return ;
    }

    // Get all available Roles
    AppCommons.getRoles((roles) => {
      this.setState({roles})
    });

    // Get all available DocTypes
    AppCommons.getDocTypes((docTypes) => {
      this.setState({docTypes})
    });

    Api('get', '/users/' + AuthHelper.token().sub)
      .end((err, res) => {
        if (res && res.status === 200) {
          this.setState({firstname: res.body.name.first});
          this.setState({lastname: res.body.name.last});
          this.setState({email: res.body.email});
          this.setState({username: res.body.username});
        }
      });
  }

  firstNameChange(e) {
    this.setState({firstname: e.target.value});
  }
  lastNameChange(e) {
    this.setState({lastname: e.target.value});
  }
  usernameChange(e) {
    this.setState({username: e.target.value});
  }
  emailChange(e) {
    this.setState({email: e.target.value});
  }
  oldPasswordChange(e) {
    this.setState({oldPassword: e.target.value});
  }
  newPasswordChange(e) {
    this.setState({newPassword: e.target.value});
  }
  repeatPasswordChange(e) {
    this.setState({rNewPassword: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (
      !(this.state.firstname &&
      this.state.lastname &&
      this.state.email &&
      this.state.username)
    ) {
      toastr.error('All fields must be filled');
      return ;
    }

    Api('put', '/users/' + AuthHelper.token().sub)
      .send({
        name: {
          first: this.state.firstname,
          last: this.state.lastname
        },
        email: this.state.email,
        username: this.state.username
      })
      .end((err, res) => {
        if (res && res.status === 200) {
          toastr.success('Successfuly updated profile');
        } else {
          toastr.error('Could not update profile, conflict email or username');
        }
      });
  }

  submitPassword(e) {
    e.preventDefault();

    if (
      this.state.oldPassword.length > 6 &&
      this.state.newPassword.length > 6
    ) {
      if (this.state.newPassword === this.state.rNewPassword) {
        Api('put', '/me/password')
          .send({
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
          })
          .end((err, res) => {
            if (res && res.status === 200) {
              toastr.success('Password changed successfuly');
            } else {
              toastr.success('Your old password does not match');
            }
          });
      } else {
        toastr.warning('Your new password should be at least 6 characters');
      }
    }
  }

  changePasswordModal() {
    $('.password-modal')
      .modal('show');
  }

  render() {
    let newDoc = (
      <div className='ui container'>

        <div className='ui modal password-modal'>
          <div className='header'>Change your password</div>
          <div className='content'>
            <form className='ui form' onSubmit={this.submitPassword}>
              <div className='field'>
                <label>Old Password</label>
                <input type='password' onChange={this.oldPasswordChange} value={this.state.oldPassword} placeholder='Old Password' />
              </div>
              <div className='field'>
                <label>New Password</label>
                <input type='password' onChange={this.newPasswordChange} value={this.state.newPassword} placeholder='New Password' />
              </div>
              <div className='field'>
                <label>Type your new password again</label>
                <input type='password' onChange={this.repeatPasswordChange} value={this.state.rNewPassword} placeholder='Repeat password' />
              </div>

              <button className='ui button' type='submit'>Save</button>
            </form>
          </div>
        </div>

        <div className='ui segments'>
          <div className='ui inverted segment' style={{backgroundColor: '#999'}}>
            <h3>Edit your profile</h3>
          </div>

          <div className='ui segment'>

            <form className='ui form' onSubmit={this.handleSubmit}>

              <div className='field'>
                <label>First Name</label>
                <input onChange={this.firstNameChange} value={this.state.firstname || ''} type='text' placeholder='Drake' />
              </div>
              <div className='field'>
                <label>Last Name</label>
                <input onChange={this.lastNameChange} value={this.state.lastname || ''} type='text' placeholder='Josh' />
              </div>
              <div className='field'>
                <label>Email</label>
                <input onChange={this.emailChange} value={this.state.email || ''} type='text' placeholder='drizzy@driz.com' />
              </div>
              <div className='field'>
                <label>Username</label>
                <input onChange={this.usernameChange} value={this.state.username || ''} type='text' placeholder='drizzy' />
              </div>

              <div className='ui two buttons'>
                <button type='submit' className='ui fluid button green submit'>
                  Save profile
                </button>
                <button type='button' onClick={this.changePasswordModal} className='ui fluid button teal'>
                  <i className='lock icon'></i>
                  Update password
                </button>
              </div>


            </form>

        </div>
        </div>
      </div>
    );

    return <MainLayout view={newDoc} />
  }
}

export default ProfilePage;
