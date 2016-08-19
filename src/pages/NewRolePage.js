import React from 'react';
import MainLayout from './../containers/MainLayout';
import {Link} from 'react-router';
import AppCommons from './../helpers/AppCommons';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';

class NewRolePage extends React.Component {
  constructor() {
    super();

    this.inpTitleChange = this.inpTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      roles: []
    };
  }

  componentDidMount() {
    if (AuthHelper.logoutIfUnauthed()) {
      return ;
    }

    // Get all available Roles
    AppCommons.getRoles((roles) => {
      this.setState({roles});
    });
  }

  inpTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.title) {
      toastr.error('Role title cannot be empty');
      return ;
    }

    Api('post', '/roles')
      .send({
        title: this.state.title
      })
      .end((err, res) => {
        if (res) {

          let roles = this.state.roles;
          roles.push({title: this.state.title});

          this.setState({roles});
          toastr.success('Role added');

          this.setState({title: ''});
        } else {
          toastr.danger('Role couldnt be added');
        }
      });
  }

  render() {
    let jsx = (
      <div className='ui container'>
        <h3 className='ui header center aligned'>ROLES</h3>

        <div className='ui segment'>
          <div className='ui middle aligned divided list'>

            {this.state.roles.map((role) => {
              return (
                <div key={role.title} className='item'>
                  <img className='ui avatar image' src='img/ovo.png' />
                  <div className='content'>
                    <a className='header'>{role.title}</a>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        <div className='ui segments'>
          <div className='ui inverted segment' style={{backgroundColor: '#999'}}>
            <h3>Create A New Role</h3>
          </div>

          <div className='ui segment'>

            <form className='ui form' onSubmit={this.handleSubmit}>

              <div className='field'>
                <label>Role title</label>
                <input value={this.state.title || ''} onChange={this.inpTitleChange} type='text' placeholder='Super duper admin' />
              </div>

              <button type='submit' className='ui fluid button green submit'>
                Create
              </button>

            </form>

          </div>
        </div>

      </div>
    );

    return <MainLayout view={jsx} />
  }
}

export default NewRolePage;
