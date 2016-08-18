import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class BareLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='ui container'>
        {this.props.view || this.props.children}
      </div>
    )
  }
}

export default BareLayout;
