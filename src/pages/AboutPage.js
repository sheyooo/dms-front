import React from 'react';
import CenterLayoutNoAuth from './../containers/CenterLayoutNoAuth';
import {Link} from 'react-router';
import AuthHelper from './../helpers/AuthHelper';

class AboutPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className='about-overlay'>
          <img src='img/drake1.jpg' />
          <div></div>
        </div>
        <CenterLayoutNoAuth>
          <div className='' style={{marginTop: '100px'}}>
            <img src='img/ovo.png' />
            <h2 style={{color: '#fff', fontWeight: '200'}}>
              It's an application that helps users manage
               their documents in an organized way. A User can be able to upload a
                document, edit it and share it with other users. Aside from
                enabling users to properly document their work with regard to
                category, the application permits users to work collaboratively on
                 documents.
            </h2>

            <Link to='login' className='ui massive green button'>Get Started</Link>
          </div>

        </CenterLayoutNoAuth>

      </div>
    )
  }
}

export default AboutPage;
