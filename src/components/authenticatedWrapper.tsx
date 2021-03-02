import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Dimmer,
  Loader,
  Sidebar,
  Container,
  Button,
  Card,
  Image,
  Icon,
  Header,
} from 'semantic-ui-react';
import { IAppState, ICommonState } from '../interface/state';
import { ICommonUser } from '../interface';
import { BLOCKED_ACCESS_PAGES, APP_PATH } from '../constants';
import {
  setUserAuth,
  resetCommonState,
  setPageLoading,
  setSidebarVisible,
  getUserProfile,
  sendVerificationEmail,
  updateUserProfile,
} from '../redux/actions/common';
import Firebase from '../service';
import SidebarMenu from './sidebarMenu';
import Navbar from './navbar';
import { formatPrintDate } from '../helper';
import '../styles/AuthenticationWrapper.modules.scss';
import { IUserModels } from '../interface/model';

interface IAuthenticatedWrapperProps extends RouteComponentProps {
  common: ICommonState,
  setUserAuth(user: ICommonUser): void;
  resetCommonState(): void;
  setPageLoading(pageLoading: boolean): void;
  setSidebarVisible(sidebarVisible: boolean): void;
  getUserProfile(email: string): void;
  sendVerificationEmail(): void;
  updateUserProfile(userProfile: IUserModels): void;
}

class AuthenticatedWrapper extends React.Component<IAuthenticatedWrapperProps> {
  private observer;

  constructor(props) {
    super(props);
    if (!localStorage.getItem('user-token-elearning')) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    const { pathname } = this.props.location;

    if (!BLOCKED_ACCESS_PAGES.includes(pathname as APP_PATH)) {
      const firebase = new Firebase();

      this.props.setPageLoading(true);
      this.observer = firebase.getAuth().onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          this.props.setUserAuth(userAuth);
          const refreshToken = await userAuth.getIdToken();
          localStorage.setItem('user-token-elearning', refreshToken);

          await this.props.getUserProfile(userAuth.email);
          if (userAuth.emailVerified && !this.props.common.userProfile.user_isVerified) {
            const { userProfile } = this.props.common;
            userProfile.user_isVerified = true;

            await this.props.updateUserProfile(userProfile);
          }
        } else {
          firebase.logout(this.props.history);
        }
        this.props.setPageLoading(false);
      });
    }
  }

  componentWillUnmount() {
    this.observer();
    this.props.resetCommonState();
  }

  public logout = () => {
    const firebase = new Firebase();
    firebase.logout(this.props.history);
  };

  public toggleSidebar = () => {
    this.props.setSidebarVisible(!this.props.common.sidebarVisible);
  };

  public contentClick = () => {
    if (this.props.common.sidebarVisible) {
      this.props.setSidebarVisible(!this.props.common.sidebarVisible);
    }
  };

  public renderChildren = () => {
    const {
      user_full_name,
      created_at,
      user_role,
    } = this.props.common.userProfile;
    const { emailVerified } = this.props.common.user;
    if (emailVerified) {
      return (
        this.props.children
      );
    }
    return (
      <Container>
        <Header as="h1" textAlign="center">Please Verified your account first</Header>
        <Card raised centered>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{user_full_name || 'Name is empty'}</Card.Header>
            <Card.Meta>
              <span className="date">{formatPrintDate(created_at)}</span>
            </Card.Meta>
            <Card.Description>
              {user_role}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              id="btn-send-email-verification"
              size="small"
              color="teal"
              className="ml-8"
              fluid
              onClick={this.props.sendVerificationEmail}
            >
              <Icon name="send" />
              Send email verification email
            </Button>
          </Card.Content>
        </Card>
      </Container>
    );
  };

  public render() {
    const { pageLoading, sidebarVisible, userProfile } = this.props.common;
    const { user_role, user_email } = userProfile;

    return (
      <>
        <Sidebar.Pushable>
          <SidebarMenu
            isAdmin={user_role === 'admin'}
            visible={sidebarVisible}
          />
          <Sidebar.Pusher
            className="authentication-wrapper"
            dimmed={sidebarVisible}
            onClick={this.contentClick}
          >
            <Navbar
              logout={this.logout}
              name={user_email}
              toggleSidebar={this.toggleSidebar}
            />
            {this.renderChildren()}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Dimmer active={pageLoading} page>
          <Loader size="massive">Loading ...</Loader>
        </Dimmer>
      </>
    );
  }
}

const mapStateToProps = ({ common }: IAppState) => ({
  common,
});

const mapDispatchToProps = {
  setUserAuth,
  resetCommonState,
  setPageLoading,
  setSidebarVisible,
  getUserProfile,
  sendVerificationEmail,
  updateUserProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedWrapper);
