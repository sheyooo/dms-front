import React from 'react';
import LandingMenuComponent from './../components/LandingMenuComponent';

class CenterLayoutNoAuth extends React.Component {
  constructor() {
    super();
  }

  render() {
    let container = {
        position: 'relative',
        height: '700px',
        color: '#fff'
      };

    return (
      <div className='ui center aligned' style={container}>
        <div className='ui center aligned container'>

          <LandingMenuComponent />

          {this.props.children || this.props.view}
        </div>
      </div>
    )
  }
}

export default CenterLayoutNoAuth;
