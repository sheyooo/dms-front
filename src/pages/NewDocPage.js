import React from 'react';
import MainLayout from './../containers/MainLayout';
import {Link, browserHistory} from 'react-router';
import TinyMCE from 'react-tinymce';
import AppCommons from './../helpers/AppCommons';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';

class NewDocPage extends React.Component {
  constructor() {
    super();

    this.inpTitleChange = this.inpTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.selectRoleChange = this.selectRoleChange.bind(this);
    this.selectTypeChange = this.selectTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      roles: [],
      docTypes: []
    };
  }

  componentDidMount() {
    if (AuthHelper.logoutIfUnauthed()) {
      return ;
    }

    // Get all available Roles
    AppCommons.getRoles((roles) => {
      this.setState({roles})
    });

    // Get all available DocTypes
    AppCommons.getDocTypes((docTypes) => {
      this.setState({docTypes})
    });
  }

  inpTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleEditorChange(e) {
    this.setState({content: e.target.getContent()});
  }

  selectRoleChange(e) {
    this.setState({role: e.target.value});
  }

  selectTypeChange(e) {
    this.setState({docType: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!(this.state.title && this.state.content)) {
      toastr.error('You must fill in necessary fields');
      return ;
    }

    Api('post', '/documents')
      .send({
        title: this.state.title,
        content: this.state.content,
        role: this.state.role,
        type: this.state.docType
      })
      .end((err, res) => {
        if (res) {
          toastr.success('Successfuly created your document');
          browserHistory.push('documents/' + res.body._id);
        } else {
          toastr.error('Sorry, we couldnt create the document it\'s a duplicate');
        }
      });
  }

  render() {
    let newDoc = (
      <div className='ui container'>
        <div className='ui segments'>
          <div className='ui inverted segment' style={{backgroundColor: '#999'}}>
            <h3>Create A New Document</h3>
          </div>

          <div className='ui segment'>

            <form className='ui form' onSubmit={this.handleSubmit}>
              <div className='field'>
                <label>Document title</label>
                <input onChange={this.inpTitleChange} name='title' type='text' placeholder='Arigatou' />
              </div>

              <div className='field'>
                <label>Content</label>
                <TinyMCE
                  content=""
                  config={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  name='title'
                  onChange={this.handleEditorChange} />
              </div>

              <div className='field'>
                <label>Select role</label>
                <select onChange={this.selectRoleChange} className='ui dropdown'>
                  <option value=''>Select a role for the document</option>
                  {this.state.roles.map((role) => {
                    return <option key={role.title} value={role.title}>{role.title}</option>
                  })}
                </select>
              </div>

              <div className='field'>
                <label>Select type</label>
                <select onChange={this.selectTypeChange} className='ui dropdown'>
                  <option value=''>Select document type</option>
                  {this.state.docTypes.map((type) => {
                    return <option key={type.title} value={type.title}>{type.title}</option>
                  })}
                </select>
              </div>

              <button type='submit' className='ui fluid button green submit'>
                Create
              </button>
            </form>

        </div>
        </div>
      </div>
    );

    return <MainLayout view={newDoc} />
  }
}

export default NewDocPage;
