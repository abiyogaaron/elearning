import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './container/LoginPage';
import 'semantic-ui-css/semantic.min.css';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    );
  }
}

export default App;
