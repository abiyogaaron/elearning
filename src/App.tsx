import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import LoginPage from './container/loginPage';
import RedirectPage from './container/redirectPage';
import 'semantic-ui-css/semantic.min.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route component={RedirectPage} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
