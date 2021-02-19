import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Firebase from '../service';
import Navbar from '../components/navbar';

interface IHomeProps extends RouteComponentProps {

}

class Home extends React.PureComponent<IHomeProps> {
  public logout = () => {
    const firebase = new Firebase();
    firebase.logout(this.props.history);
  };

  x;

  public render() {
    return (
      <>
        <Navbar logout={this.logout} name="My Profile" />
      </>
    );
  }
}

export default withRouter(Home);
