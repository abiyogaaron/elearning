import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Image,
} from 'semantic-ui-react';
import { ILoginPageState, IAppState } from '../interface/state';
import Validator from '../helper/Validator';
import { LOGIN_VALIDATION_RULES } from '../helper/validationRule';
import {
  setErrors,
} from '../redux/actions/loginPage';
import '../styles/LoginPage.modules.scss';
import logo from '../images/elearning-logo.png';
import ErrorMessage from '../components/errorMessage';

interface ILoginPageProps extends RouteComponentProps {
  loginPage: ILoginPageState;
  setErrors(errors: { [key: string]: string }): void;
}

interface ILoginPageStates {
  email: string;
  password: string;
}

class LoginPage extends React.PureComponent<ILoginPageProps, ILoginPageStates> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = {
      email: props.loginPage.form.email,
      password: props.loginPage.form.password,
    };
  }

  public handleClick = () => {
    Validator.validate(this.state, LOGIN_VALIDATION_RULES)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        this.props.setErrors(errorMessages);
      });
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState = { ...this.state };
    newState[name] = value;

    this.setState(newState);
  };

  public render() {
    const { email, password } = this.state;
    const { errors } = this.props.loginPage;

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
                name="email"
                value={email}
                onChange={this.handleChange}
                iconPosition="left"
                placeholder="Your Email Address"
                error={!!errors.email}
              />
              <ErrorMessage message={errors.email} />
              <Form.Input
                fluid
                icon="lock"
                name="password"
                value={password}
                onChange={this.handleChange}
                iconPosition="left"
                type="password"
                placeholder="Your Password"
                error={!!errors.password}
              />
              <ErrorMessage message={errors.password} />
              <Button color="teal" fluid size="large" onClick={this.handleClick}>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ loginPage }: IAppState) => ({
  loginPage,
});

const mapDispatchToProps = {
  setErrors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginPage));
