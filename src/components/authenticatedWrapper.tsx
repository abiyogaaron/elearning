import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { IAppState, ICommonState } from '../interface/state';
import { ICommonUser } from '../interface';
import {
  setUserAuth,
  resetCommonState,
  setPageLoading,
} from '../redux/actions/common';
import Firebase from '../service';

interface IAuthenticatedWrapperProps extends RouteComponentProps {
  common: ICommonState,
  setUserAuth(user: ICommonUser): void;
  resetCommonState(): void;
  setPageLoading(pageLoading: boolean): void;
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

  public render() {
    const { pageLoading } = this.props.common;
    return (
      <>
        {this.props.children}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedWrapper);
