import React from 'react';
import {Router, Link, Route, IndexRoute, browserHistory} from 'react-router';
import LoginPage from './../pages/LoginPage';
import SignupPage from './../pages/SignupPage';
import LandingPage from './../pages/LandingPage';
import AboutPage from './../pages/AboutPage';
import NewDocPage from './../pages/NewDocPage';
import NewRolePage from './../pages/NewRolePage';
import NewTypePage from './../pages/NewTypePage';
import ViewDocPage from './../pages/ViewDocPage';
import MyDocsPage from './../pages/MyDocsPage';
import ProfilePage from './../pages/ProfilePage';
import DashboardPage from './../pages/DashboardPage';
import InvalidRoute from './InvalidRoute';
import AuthHelper from './../helpers/AuthHelper';

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    setTimeout(() => {
      toastr.options = {
        'positionClass': 'toast-bottom-left',
        'progressBar': false,
        'closeButton': false
      }
    }, 2000);
  }

  render() {
    return (
      <div className=''>
        <Router name='app' history={browserHistory}>
          <Route path=''>
            <Route path='/' component={LandingPage} auth={false} />
            <Route path='about' component={AboutPage} auth={false} />
            <Route path='login' component={LoginPage} auth={false} />
            <Route path='signup' component={SignupPage} auth={false} />
            <Route path='home' component={NewDocPage} auth={true} />
            <Route path='dashboard' component={DashboardPage} auth={true} />
            <Route path='new' component={NewDocPage} auth={true} />
            <Route path='new-role' component={NewRolePage} auth={true} />
            <Route path='new-type' component={NewTypePage} auth={true} />
            <Route path='documents/:docID' component={ViewDocPage} auth={true} />
            <Route path='documents' component={MyDocsPage} auth={true} />
            <Route path='profile' component={ProfilePage} auth={true} />
            <Route path='*' component={InvalidRoute} auth={false} />
          </Route>
        </Router>
      </div>
    )
  }
}

export default App;
