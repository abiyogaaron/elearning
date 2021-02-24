import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Grid,
  Icon,
  Button,
  Table,
} from 'semantic-ui-react';
import { IAppState, ISubjectsPageState } from '../interface/state';
import {
  resetStateData,
  getSubjects,
} from '../redux/actions/subjectsPage';
import BreadcrumbsMenu from '../components/breadcrumbsMenu';

interface ISubjectsPageProps extends RouteComponentProps {
  subjectsPage: ISubjectsPageState;
  resetStateData(): void;
  getSubjects(): void;
}

class SubjectsPage extends React.PureComponent<ISubjectsPageProps> {
  componentDidMount() {
    this.props.getSubjects();
  }

  componentWillUnmount() {
    this.props.resetStateData();
  }

  public renderSubjectList = () => {
    const { list } = this.props.subjectsPage;

    return list.map((item, idx) => (
      <Table.Row key={item.id}>
        <Table.Cell width={1}>{idx + 1}</Table.Cell>
        <Table.Cell>{item.subject_name}</Table.Cell>
        <Table.Cell width={3}>{item.week_number}</Table.Cell>
        <Table.Cell width={3}>{item.subject_category}</Table.Cell>
        <Table.Cell width={4}>{item.semester}</Table.Cell>
      </Table.Row>
    ));
  };

  public render() {
    const { isLoading } = this.props.subjectsPage;

    return (
      <Container>
        <BreadcrumbsMenu
          showNextMenu={false}
          title="Lesson Subject"
          iconName="book"
        />
        <Segment raised padded loading={isLoading}>
          <Grid verticalAlign="middle">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as="h3">Subjects Overview</Header>
              </Grid.Column>
              <Grid.Column>
                <div className="pull-right">
                  <Button color="teal" as={Link} to="/subjects/create">
                    <Icon name="plus" />
                    {' '}
                    New Subject
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Table celled structured>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>No</Table.HeaderCell>
                <Table.HeaderCell>Subject name</Table.HeaderCell>
                <Table.HeaderCell width={3}>week number</Table.HeaderCell>
                <Table.HeaderCell width={3}>subject category</Table.HeaderCell>
                <Table.HeaderCell width={4}>semester</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderSubjectList()}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ subjectsPage }: IAppState) => ({
  subjectsPage,
});

const mapDispatchToProps = {
  resetStateData,
  getSubjects,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SubjectsPage));
