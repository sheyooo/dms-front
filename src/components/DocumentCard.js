import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

class DocumentCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    let card;

    if (this.props.doc) {
      card = (
        <div key={this.props.doc._id} className='ui card dms-doc-card'>
          <div className='content'>

            <div className='header'>
              {this.props.doc.title}
            </div>
          </div>

          <div className='content'>
            <div className='meta'>
              <i className='wait icon large'></i>
              {moment(this.props.doc.updatedAt).fromNow()}
            </div>
            <div className='description'>
              <div className='doc-content' dangerouslySetInnerHTML={{__html: this.props.doc.content}}></div>

              <div className='row' style={{marginTop: '20px'}}>
                <span className=''>
                  <i className='user icon large'></i>
                  Uploaded by:
                  {
                    ' ' + this.props.doc.ownerId.name.first +
                    ' ' + this.props.doc.ownerId.name.last
                  }
                </span>
              </div>
            </div>

          </div>
          <div className='extra content center aligned'>
            <Link to={'/documents/' + this.props.doc._id} className="ui animated teal fluid vertical button" tabindex="0">
              <div className="visible content">View Document</div>
              <div className="hidden content">
                <i className="right arrow icon"></i>
              </div>
            </Link>
          </div>
        </div>
      );
    } else {
      card = (
        <div className='ui card dms-doc-card'>
          <div className='content'>

            <div className='header'>
              No documents yet.
            </div>
          </div>

          <div className='content'>
            <div className='meta'>
              We don't have any of your documents stored
            </div>
            <div className='description'>
              You can create a document from here
            </div>

          </div>
          <div className='extra content center aligned'>
            <Link to='new' className='ui teal button'>Create document</Link>
          </div>
        </div>
      );
    }

    return card;
  }
}

export default DocumentCard;
