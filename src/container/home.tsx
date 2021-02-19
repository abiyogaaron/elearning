import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react';

interface IHomeProps extends RouteComponentProps {

}

class Home extends React.PureComponent<IHomeProps> {
  public render() {
    return (
      <Container>
        <Segment>Pellentesque habitant morbi tristique senectus.</Segment>
      </Container>
    );
  }
}

export default withRouter(Home);
