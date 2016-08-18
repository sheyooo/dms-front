import React from 'react';
import CenterLayoutNoAuth from './../containers/CenterLayoutNoAuth';
import {Link} from 'react-router';
import AuthHelper from './../helpers/AuthHelper';

class LandingPage extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (AuthHelper.loginIfAuthed()) {
      return ;
    }
  }

  render() {
    return (
      <div>
        <div className='about-overlay'>
          <img src='img/drake.jpg' />
          <div></div>
        </div>
        <CenterLayoutNoAuth>

          <div className='' style={{marginTop: '100px'}}>
            <img src='img/ovo.png' />
            <h2 style={{color: '#fff', fontWeight: '100'}}>
              THE BEST WAY TO MANAGE YOUR DOCUMENTS
              <span className='ok-hand-emoji'>👌</span>
            </h2>
            <Link to='login' className='ui massive green button'>Get Started</Link>
          </div>

        </CenterLayoutNoAuth>
      </div>
    )
  }
}

export default LandingPage;
