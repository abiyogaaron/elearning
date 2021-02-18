import React from 'react';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';
import '../styles/redirectPage.modules.scss';

const redirectPage = () => (
  <Grid textAlign="center" verticalAlign="middle" className="redirect-page">
    <Grid.Column width="6">
      <Header as="h1" color="teal" icon>
        <Icon name="warning sign" circular />
        <Header.Content>404</Header.Content>
        <Header.Subheader>url page that you want is not found</Header.Subheader>
      </Header>
    </Grid.Column>
  </Grid>
);

export default redirectPage;
