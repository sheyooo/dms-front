import React from 'react';
import MainLayout from './../containers/MainLayout';
import LoaderComponent from './../components/LoaderComponent';
import {Link, browserHistory} from 'react-router';
import faker from 'faker';
import moment from 'moment';
import AppCommons from './../helpers/AppCommons';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';

class ViewDocPage extends React.Component {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.inpTitleChange = this.inpTitleChange.bind(this);
    this.inpContentChange = this.inpContentChange.bind(this);
    this.selectRoleChange = this.selectRoleChange.bind(this);
    this.selectTypeChange = this.selectTypeChange.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.restore = this.restore.bind(this);

    this.state = {
      document: {
        ownerId: {
          name: {}
        }
      },
      editDoc: {},
      roles: [],
      docTypes: []
    }
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

    Api('get', '/documents/' + this.props.params.docID)
      .end((err, res) => {
        if (res && res.status === 200) {
          this.setState({document: res.body});
        } else if (res && res.status === 404) {
          toastr.warning('Document not found');
          browserHistory.push('dashboard');
        } else if (res && res.status === 401) {
          toastr.warning('You are not authourized for that document');
          browserHistory.push('dashboard');
        }

        this.refs.loader.stop();
      });

      $('.ui.modal')
        .modal();
  }

  onEdit() {
    this.setState({editDoc: this.state.document}, () => {
      $('.roleSelect').dropdown('set selected', this.state.editDoc.role);
      $('.typeSelect').dropdown('set selected', this.state.editDoc.type);
    });

    this.refs.title.value = this.state.editDoc.title;
    this.refs.content.value = this.state.editDoc.content;

    $('.ui.modal:last-of-type')
      .modal('show');
  }

  onDelete() {
    Api('delete', '/documents/' + this.props.params.docID)
      .end((err, res) => {
        if (res && res.status === 200) {
          toastr.success('Deleted!');
          browserHistory.push('/dashboard');
        } else if(res.status === 401) {
          toastr.error('This is not your document!');
        }

      });
  }

  inpTitleChange(e) {
    this.setState({
      editDoc: {
        title: e.target.value,
        content: this.state.editDoc.content,
        role: this.state.editDoc.role,
        type: this.state.editDoc.type
      }
    });
  }

  inpContentChange(e) {
    this.setState({
      editDoc: {
        title: this.state.editDoc.title,
        content: e.target.value,
        role: this.state.editDoc.role,
        type: this.state.editDoc.type
      }
    });
  }

  selectRoleChange(e) {
    this.setState({
      editDoc: {
        title: this.state.editDoc.title,
        content: this.state.editDoc.content,
        role: e.target.value,
        type: this.state.editDoc.type
      }
    });
  }

  selectTypeChange(e) {
    this.setState({
      editDoc: {
        title: this.state.editDoc.title,
        content: this.state.editDoc.content,
        role: this.state.editDoc.role,
        type: e.target.value
      }
    });
  }

  saveEdit(e) {
    e.preventDefault();

    Api('put', '/documents/' + this.props.params.docID)
      .send({
        title: this.state.editDoc.title,
        content: this.state.editDoc.content,
        role: this.state.editDoc.role,
        type: this.state.editDoc.type
      })
      .end((err, res) => {
        if (res && res.status === 200) {
          this.setState({document: res.body});
          toastr.success('Successfuly updated document');
        } else {
          toastr.error('Could not edit your document');
        }
      });
  }

  restore(e) {
    $('#roleSelect').dropdown('set selected', this.state.document.role);
    $('#typeSelect').dropdown('set selected', this.state.document.type);

    this.setState({
      editDoc: this.state.document
    });
  }

  render() {
    let doc = (
      <div className='ui container' style={{paddingBottom: '30px'}}>
        <LoaderComponent message='I am on my way, give me a few...' ref='loader'/>
        <div className='ui segments dms-doc-card'>
          <div className='ui segment'>
            <h3>{this.state.document.title}</h3>
          </div>

          <div className='ui segment'>


            <div className='ui grid container'>
              <div dangerouslySetInnerHTML={{ __html: this.state.document.content }} className='row'>
              </div>
              <div className='ui divider'></div>

              <div className='row'>
                <div className='column'>
                  <span className='ui tag teal label'>{this.state.document.type || 'Unassigned'}</span>
                  <span className='ui brown label'>{this.state.document.role || 'Nil'}</span>
                </div>
              </div>
              <div className='row'>
                <span className=''>
                  <i className='wait icon large'></i>
                  {moment(this.state.document.updatedAt).format('LLLL')}
                </span>
              </div>
              <div className='row'>
                <span className=''>
                  <i className='user icon large'></i>
                  Uploaded by:
                  {
                    ' ' + this.state.document.ownerId.name.first +
                    ' ' + this.state.document.ownerId.name.last
                  }
                </span>
              </div>

            </div>
        </div>

        <div className='ui segment'>
          <div className='ui equal width centered grid'>
            <div className='column'>
              <div onClick={this.onEdit} id='edit-button' className='ui animated fade primary fluid button' tabindex='0'>
                <div className='visible content'>Edit</div>
                <div className='hidden content'>
                  <i className='write icon'></i>
                </div>
              </div>
            </div>
            <div className='column'>
              <div onClick={this.onDelete} id='delete-button' className='ui animated fluid fade button' tabindex='0'>
                <div className='visible content'>Delete</div>
                <div className='hidden content'>
                  <i className='trash icon'></i>
                </div>
              </div>
            </div>

          </div>
        </div>

        </div>

        <div className='ui modal' id={'modal' + this.state.document._id}>
          <div className='header'>Edit Document</div>
          <div className='content'>
            <form className='ui form' onSubmit={this.handleSubmit}>

              <div className='field'>
                <label>Document title</label>
                <input value={this.state.editDoc.title || ''} onChange={this.inpTitleChange} type='text' placeholder='Arigatou' ref='title' />
              </div>
              <div className='field'>
                <label>Content</label>
                <textarea value={this.state.editDoc.content || ''}  onChange={this.inpContentChange} placeholder='Lorem ipsum' ref='content'></textarea>
              </div>
              <div className='field'>
                <label>Select role</label>
                <select onChange={this.selectRoleChange} className='ui dropdown roleSelect' ref='role'>
                  <option value=''>Select a role for the document</option>
                  {this.state.roles.map((role) => {
                    if (this.state.editDoc.role === role.title) {
                      return <option key={role.title} value={role.title}>{role.title}</option>
                    } else {
                      return <option key={role.title} value={role.title}>{role.title}</option>
                    };
                  })}
                </select>
              </div>
              <div className='field'>
                <label>Select type</label>
                <select onChange={this.selectTypeChange} className='ui dropdown typeSelect' ref='type'>
                  <option value=''>Select document type</option>
                  {this.state.docTypes.map((type) => {
                    if (this.state.editDoc.type === type.title) {
                      return <option key={type.title} value={type.title}>{type.title}</option>
                    } else {
                      return <option key={type.title} value={type.title}>{type.title}</option>
                    };
                  })}
                </select>
              </div>
            </form>

          </div>
          <div className='actions'>
            <div onClick={this.saveEdit} className='ui approve green button'>Save</div>
            <div onClick={this.restore} className='ui button'>Restore Document</div>
            <div className='ui cancel red button'>Cancel</div>
          </div>
        </div>



      </div>
    );

    return <MainLayout view={doc} />
  }
}

export default ViewDocPage;
