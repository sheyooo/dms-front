import React from 'react';
import MainLayout from './../containers/MainLayout';
import LoaderComponent from './../components/LoaderComponent';
import DocumentCard from './../components/DocumentCard';
import Api from './../helpers/ApiClient';
import AuthHelper from './../helpers/AuthHelper';

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    if (AuthHelper.logoutIfUnauthed()) {
      return ;
    }

    Api('get', '/documents')
      .end((err, res) => {
        if (res && res.status === 200) {
          this.setState({documents: res.body.data});
        }

        this.refs.loader.stop();
      });
  }

  render() {
    let cards;

    if (this.state.documents.length) {
      cards = this.state.documents.map((doc) => {
        return (
          <div className='column' key={doc._id} style={{paddingBottom: '20px'}}>
            <DocumentCard doc={doc} />
          </div>
        )
      });
    } else {
      cards = (
        <div className='column'>
          <DocumentCard doc={false} />
        </div>
      )
    }

    let newDoc = (
        <div className=''>
          <div className='ui padded stackable grid'>
            <LoaderComponent ref='loader' />
            <div className='three column row' style={{maxWidth: 'none'}}>
              {cards}
            </div>
          </div>
        </div>
    );

    return (
      <MainLayout>
        {newDoc}
      </MainLayout>
    );
  }
}

export default DashboardPage;
