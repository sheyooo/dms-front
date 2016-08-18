import React from 'react';
import {Link} from 'react-router';

class InvalidRoute extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <h1>404</h1>
        <Link to='/'>Go back home</Link>
      </div>
    )
  }
}

export default InvalidRoute;
