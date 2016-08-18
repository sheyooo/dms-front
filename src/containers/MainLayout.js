import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import AuthHelper from './../helpers/AuthHelper';

class MainLayout extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    $('.ui.dropdown').dropdown();
  }

  logout() {
    AuthHelper.logout();
    browserHistory.push('/login');
  }

  render() {
    return (
      <div className='ash-bg-container'>
        <div className='ui large top stackable menu dms-menu'>
          <Link to='/dashboard' activeClassName='active' className='item hide-small-screen'>
            <i className='home icon'></i> Home
          </Link>
          <Link to='documents' activeClassName='active' className='item hide-small-screen'>
            My Documents
          </Link>
          <Link to='new-role' activeClassName='active' className='item hide-small-screen'>
            Roles
          </Link>
          <Link to='new-type' activeClassName='active' className='item hide-small-screen'>
            Doc Types
          </Link>
          <Link to='profile' activeClassName='active' className='item hide-small-screen'>
            Profile
          </Link>
          <Link to='new' activeClassName='active' className='item hide-small-screen'>
            Create
          </Link>


          <div className='ui dropdown item hide-large-screen'>
            <i className='content icon'></i> Menu
            <div className='menu'>
              <Link to='/dashboard' activeClassName='active' className='item'>
                <i className='home icon'></i> Home
              </Link>
              <Link to='documents' activeClassName='active' className='item'>
                My Documents
              </Link>
              <Link to='new-role' activeClassName='active' className='item'>
                Roles
              </Link>
              <Link to='new-type' activeClassName='active' className='item'>
                Doc Types
              </Link>
              <Link to='profile' activeClassName='active' className='item'>
                Profile
              </Link>
              <Link to='new' activeClassName='active' className='item'>
                Create
              </Link>
              <button onClick={this.logout} activeClassName='active' className='item'>
                Log out
              </button>
            </div>
          </div>
          <div className='right menu'>
            <Link to='profile' activeClassName='active' className='item hide-small-screen'>
              Hi&nbsp; <b>{AuthHelper.token().firstName}</b>
            </Link>
            <div className='item hide-small-screen'>
                <button onClick={this.logout} className='ui green button'>Log out</button>
            </div>
          </div>
        </div>

        {this.props.view || this.props.children}

      </div>
    )
  }
}

export default MainLayout;
