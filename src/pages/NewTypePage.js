import React from 'react';
import MainLayout from './../containers/MainLayout';
import {Link} from 'react-router';
import AppCommons from './../helpers/AppCommons';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';

class NewTypePage extends React.Component {
  constructor() {
    super();

    this.inpTitleChange = this.inpTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      docTypes: []
    };
  }

  componentDidMount() {
    if (AuthHelper.logoutIfUnauthed()) {
      return ;
    }

    // Get all available DocTypes
    AppCommons.getDocTypes((docTypes) => {
      this.setState({docTypes})
    });
  }

  inpTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.title) {
      toastr.error('Doc Type title cannot be empty');
      return ;
    }

    Api('post', '/doc-types')
      .send({
        title: this.state.title
      })
      .end((err, res) => {
        if (res) {

          let types = this.state.docTypes;
          types.push({title: this.state.title});

          this.setState({types});
          this.setState({title: ''});

          toastr.success('Doc Type added');

        } else {
          toastr.error('Doc Type could not be added');
        }
      });
  }

  render() {
    let jsx = (
      <div className='ui container'>
        <h3 className='ui header center aligned'>DOCUMENT TYPES</h3>

        <div className='ui segment'>
          <div className='ui middle aligned divided list'>

            {this.state.docTypes.map((type) => {
              return (
                <div key={type.title} className='item'>
                  <img className='ui avatar image' src='img/ovo.png' />
                  <div className='content'>
                    <a className='header'>{type.title}</a>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        <div className='ui segments'>
          <div className='ui inverted segment' style={{backgroundColor: '#999'}}>
            <h3>Create A New Doc Type</h3>
          </div>

          <div className='ui segment'>

            <form className='ui form' onSubmit={this.handleSubmit}>

              <div className='field'>
                <label>Type title</label>
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

export default NewTypePage;
