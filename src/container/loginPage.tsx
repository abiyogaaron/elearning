import React from 'react';
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Image,
} from 'semantic-ui-react';
import '../styles/LoginPage.modules.scss';
import logo from '../images/elearning-logo.png';

class LoginPage extends React.PureComponent {
  public render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="login-page">
        <Grid.Column width="5">
          <Header as="h2" textAlign="center" color="teal">
            <Image src={logo} centered />
            Sign in to your account
          </Header>
          <Form size="large">
            <Segment raised padded>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Your Email Address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                type="password"
                placeholder="Your Password"
              />
              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginPage;
