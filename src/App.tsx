import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import LoginPage from './container/loginPage';
import Home from './container/home';
import RedirectPage from './container/redirectPage';
import Subject from './container/subjectPage';
import SubjectConfigPage from './container/subjectConfigPage';
import Toaster from './components/toaster';
import AuthenticatedWrapper from './components/authenticatedWrapper';
import 'semantic-ui-css/semantic.min.css';
import './styles/App.scss';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <Home />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path="/subjects"
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <Subject />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path="/subjects/create"
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <SubjectConfigPage />
              </AuthenticatedWrapper>
            )}
          />
          <Route component={RedirectPage} />
        </Switch>
        <Toaster />
      </Provider>
    );
  }
}

export default App;
