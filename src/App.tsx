import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import LoginPage from './container/loginPage';
import Home from './container/home';
import RedirectPage from './container/redirectPage';
import Toaster from './components/toaster';
import AuthenticatedWrapper from './components/authenticatedWrapper';
import 'semantic-ui-css/semantic.min.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <AuthenticatedWrapper {...this.props}>
            <Route exact path="/dashboard" component={Home} />
          </AuthenticatedWrapper>
          <Route component={RedirectPage} />
        </Switch>
        <Toaster />
      </Provider>
    );
  }
}

export default App;
