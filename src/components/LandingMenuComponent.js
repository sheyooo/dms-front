import React from 'react';
import {Link} from 'react-router';

class LandingMenuComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    $('.ui.dropdown').dropdown();
  }

  render() {
    let borderStyle = {
      border: 'none',
      borderBottom: '2px solid rgba(0, 0, 0, 0.3)'
    }, segmentStyle = {
      marginTop: '10px',
      padding: '5px'
    }


    return (
      <div className='' style={segmentStyle}>
        <div className='ui large borderless horizontal menu'>
          <Link to='/' activeClassName='active' className='item'>
            Home
          </Link>
          <Link to='about' activeClassName='active' className='item'>
            About
          </Link>
          <a href='https://github.com/sheyooo' activeClassName='active' className='item' target='_blank'>
            Contact Us
          </a>
          <div className='right menu hide-small-screen'>
            <div className='item'>
                <Link to='login' activeClassName='active' className='ui green button'>Log in</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingMenuComponent;
