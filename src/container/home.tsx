import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Button,
  Grid,
  Icon,
  Form,
  Input,
  Progress,
} from 'semantic-ui-react';
import { IAppState, ICommonState, IHomeState } from '../interface/state';
import { uploadPPT } from '../redux/actions/homePage';
import '../styles/Home.modules.scss';

interface IHomeProps extends RouteComponentProps {
  common: ICommonState;
  homePage: IHomeState;
  uploadPPT(slideName: string, file: any): void;
}

interface IHomePageState {
  file: any;
}

class Home extends React.PureComponent<IHomeProps, IHomePageState> {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      this.setState({ file: e.target.files[0] });
    }
  };

  public handleUpload = () => {
    const { file } = this.state;
    this.props.uploadPPT(file.name, file);
  };

  public renderProgressUpload = () => {
    const { progressUpload } = this.props.homePage;
    if (progressUpload > 0) {
      return (
        <Progress percent={progressUpload} indicating />
      );
    }
    return null;
  };

  public dashboardRender = () => {
    const { role } = this.props.common.userProfile;
    const { isLoading } = this.props.homePage;

    if (role === 'admin') {
      return (
        <Grid.Row>
          <Grid.Column computer="7" mobile="16" tablet="7">
            <Form>
              <Form.Field>
                <label htmlFor="input-file-upload">Slide Powerpoint</label>
                <Input
                  id="input-file-upload"
                  type="file"
                  className="home-input-file"
                  onChange={this.handleChange}
                  disabled={isLoading}
                />
                {this.renderProgressUpload()}
              </Form.Field>
              <Form.Field>
                <Button
                  color="teal"
                  icon
                  labelPosition="right"
                  onClick={this.handleUpload}
                  disabled={isLoading}
                >
                  Upload
                  <Icon name="upload" />
                </Button>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      );
    }
    return null;
  };

  public render() {
    const { userProfile } = this.props.common;
    return (
      <Container>
        <Segment raised padded>
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header color="teal" dividing>
                  {userProfile.role}
                  {' '}
                  dashboard
                </Header>
              </Grid.Column>
            </Grid.Row>
            {this.dashboardRender()}
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ common, homePage }: IAppState) => ({
  common,
  homePage,
});

const mapDispatchToProps = {
  uploadPPT,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Home));
