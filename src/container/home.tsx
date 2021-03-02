import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';
import { IAppState, ICommonState, IHomeState } from '../interface/state';
import '../styles/Home.modules.scss';

interface IHomeProps extends RouteComponentProps {
  common: ICommonState;
  homePage: IHomeState;
}

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.PureComponent<IHomeProps> {
  public render() {
    const { userProfile } = this.props.common;
    return (
      <Container>
        <Header color="teal" as="h2">
          <Icon name="dashboard" />
          <Header.Content>
            {userProfile.user_role}
            {' '}
            home
          </Header.Content>
        </Header>
        <Segment raised padded />
      </Container>
    );
  }
}

const mapStateToProps = ({ common, homePage }: IAppState) => ({
  common,
  homePage,
});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Home));
