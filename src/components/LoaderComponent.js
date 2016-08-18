import React from 'react';

class LoaderComponent extends React.Component {
  constructor() {
    super();
    
    this.state = {
      loading: true
    }
  }

  stop() {
    this.setState({loading: false});
  }

  start() {
    this.setState({loading: true});
  }

  render() {
    return (
      <div className={'ui dimmer ' + (this.state.loading ? 'active': '')} id='loader'>
        <div className="ui large text loader">
          {this.props.message || 'Preparing the awesomeness for you...'}
        </div>
      </div>
    )
  }


}

export default LoaderComponent;
