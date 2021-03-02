import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import { APP_PATH } from './constants';
import LoginPage from './container/loginPage';
import Home from './container/home';
import RedirectPage from './container/redirectPage';
import Subject from './container/subjectPage';
import SubjectConfigPage from './container/subjectConfigPage';
import SettingsProfile from './container/settingsProfile';
import SettingsPassword from './container/settingsPassword';
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
          <Route exact path={APP_PATH.LOGIN_PAGE} component={LoginPage} />
          <Route
            exact
            path={APP_PATH.HOME_PAGE}
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <Home />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path={APP_PATH.SUBJECTS_PAGE}
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <Subject />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path={APP_PATH.SUBJECT_CONFIG_PAGE}
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <SubjectConfigPage />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path={APP_PATH.SUBJECT_EDIT_CONFIG_PAGE}
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <SubjectConfigPage />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path={APP_PATH.PROFILE_SETTINGS_PAGE}
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <SettingsProfile />
              </AuthenticatedWrapper>
            )}
          />
          <Route
            exact
            path={APP_PATH.PROFILE_RESET_PASSWORD}
            render={() => (
              <AuthenticatedWrapper {...this.props}>
                <SettingsPassword />
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
