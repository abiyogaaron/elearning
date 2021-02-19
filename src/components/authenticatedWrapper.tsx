import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dimmer, Loader, Sidebar } from 'semantic-ui-react';
import { IAppState, ICommonState } from '../interface/state';
import { ICommonUser } from '../interface';
import {
  setUserAuth,
  resetCommonState,
  setPageLoading,
  setSidebarVisible,
} from '../redux/actions/common';
import Firebase from '../service';
import SidebarMenu from './sidebarMenu';
import Navbar from './navbar';
import '../styles/AuthenticationWrapper.modules.scss';

interface IAuthenticatedWrapperProps extends RouteComponentProps {
  common: ICommonState,
  setUserAuth(user: ICommonUser): void;
  resetCommonState(): void;
  setPageLoading(pageLoading: boolean): void;
  setSidebarVisible(sidebarVisible: boolean): void;
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
    const firebase = new Firebase();
    this.props.setPageLoading(true);
    this.observer = firebase.getAuth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.props.setUserAuth(userAuth);
      } else {
        firebase.logout(this.props.history);
      }
      this.props.setPageLoading(false);
    });
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

  public render() {
    const { pageLoading, sidebarVisible } = this.props.common;
    return (
      <>
        <Sidebar.Pushable>
          <SidebarMenu isAdmin visible={sidebarVisible} />
          <Sidebar.Pusher
            className="authentication-wrapper"
            dimmed={sidebarVisible}
            onClick={this.contentClick}
          >
            <Navbar
              logout={this.logout}
              name="My Profile"
              toggleSidebar={this.toggleSidebar}
            />
            {this.props.children}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedWrapper);
