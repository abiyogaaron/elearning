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
import { History } from 'history';
import { ILoginPageState, IAppState } from '../interface/state';
import Validator from '../helper/Validator';
import { LOGIN_VALIDATION_RULES, FORGOT_PASSWORD_VALIDATION_RULES } from '../helper/validationRule';
import {
  setErrors,
  setFormData,
  loginAuthentication,
  resetStateData,
  sendResetEmail,
} from '../redux/actions/loginPage';
import { ILoginModels } from '../interface/model';
import '../styles/LoginPage.modules.scss';
import logo from '../images/elearning-logo.png';
import ErrorMessage from '../components/errorMessage';

interface ILoginPageProps extends RouteComponentProps {
  loginPage: ILoginPageState;
  setErrors(errors: { [key: string]: string }): void;
  setFormData(form: ILoginModels): void;
  loginAuthentication(email: string, password: string, history: History): void;
  sendResetEmail(email: string): void;
  resetStateData(): void;
}

interface ILoginPageStates {
  showForgetPassword: boolean;
}

class LoginPage extends React.PureComponent<ILoginPageProps, ILoginPageStates> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = {
      showForgetPassword: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user-token-elearning')) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillUnmount() {
    this.props.resetStateData();
  }

  public handleClick = () => {
    const { form } = this.props.loginPage;
    Validator.validate(form, LOGIN_VALIDATION_RULES)
      .then(async (data) => {
        this.props.loginAuthentication(data.email, data.password, this.props.history);
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        this.props.setErrors(errorMessages);
      });
  };

  public sendEmailreset = () => {
    const { form } = this.props.loginPage;
    Validator.validate(form, FORGOT_PASSWORD_VALIDATION_RULES)
      .then(async (data) => {
        this.props.sendResetEmail(data.emailForgotPassword);
        this.props.setErrors({});
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        this.props.setErrors(errorMessages);
      });
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...this.props.loginPage.form };
    newForm[name] = value;

    this.props.setFormData(newForm);
  };

  public toggleShowForm = () => {
    const { showForgetPassword } = this.state;
    this.setState({ showForgetPassword: !showForgetPassword });

    this.props.setFormData({
      email: '',
      password: '',
      emailForgotPassword: '',
    });
  };

  public renderForm = () => {
    const { showForgetPassword } = this.state;
    const { errors, isLoading, form } = this.props.loginPage;

    if (!showForgetPassword) {
      return (
        <Form size="large">
          <Segment raised padded loading={isLoading}>
            <Form.Input
              fluid
              icon="user"
              name="email"
              value={form.email}
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
              value={form.password}
              onChange={this.handleChange}
              iconPosition="left"
              type="password"
              placeholder="Your Password"
              error={!!errors.password}
            />
            <ErrorMessage message={errors.password} />
            <Button
              color="teal"
              fluid
              size="large"
              onClick={this.handleClick}
              disabled={!(form.email && form.password)}
            >
              Login
            </Button>
            <p
              className="text-label-click"
              onClick={this.toggleShowForm}
              aria-hidden="true"
            >
              Forger Password ?
            </p>
          </Segment>
        </Form>
      );
    }

    return (
      <Form size="large">
        <Segment raised padded loading={isLoading}>
          <Form.Input
            fluid
            icon="user"
            name="emailForgotPassword"
            value={form.emailForgotPassword}
            onChange={this.handleChange}
            iconPosition="left"
            placeholder="Your Email Address"
            error={!!errors.emailForgotPassword}
          />
          <ErrorMessage message={errors.emailForgotPassword} />
          <Button
            color="teal"
            fluid
            size="small"
            onClick={this.sendEmailreset}
            disabled={!form.emailForgotPassword}
          >
            Send reset password email
          </Button>
          <p
            className="text-label-click"
            onClick={this.toggleShowForm}
            aria-hidden="true"
          >
            login ?
          </p>
        </Segment>
      </Form>
    );
  };

  public render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="login-page">
        <Grid.Column mobile="14" tablet="8" computer="5">
          <Header as="h2" textAlign="center" color="teal">
            <Image src={logo} centered />
            Sign in to your account
          </Header>
          {this.renderForm()}
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
  loginAuthentication,
  resetStateData,
  setFormData,
  sendResetEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginPage));
