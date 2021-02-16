import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import '../styles/login-page.module.scss';

class LoginPage extends React.PureComponent {
  public render() {
    return (
      <Grid verticalAlign="middle" className="login-page">
        <Grid.Column>
          <Header as="h2" color="teal" textAlign="center">
            Login to your account
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginPage;
