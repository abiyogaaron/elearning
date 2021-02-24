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
  Label,
} from 'semantic-ui-react';
import { IAppState, ISubjectsPageState, ICommonState } from '../interface/state';
import { ISubjectModels } from '../interface/model';
import {
  resetStateData,
  getSubjects,
  setSubjectList,
  deleteSubject,
} from '../redux/actions/subjectsPage';
import { sortByObj, formatPrintString, formatPrintDate } from '../helper';
import BreadcrumbsMenu from '../components/breadcrumbsMenu';
import ConfirmDialog from '../components/confirmDialog';

interface ISubjectsPageProps extends RouteComponentProps {
  subjectsPage: ISubjectsPageState;
  common: ICommonState;
  resetStateData(): void;
  getSubjects(): void;
  setSubjectList(list: ISubjectModels[]): void;
  deleteSubject(id: string, index: number): void;
}

interface ISubjectPageStates {
  modalShow: boolean;
  modalTitle: string;
  selectedId: string;
  selectedIndex: number;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
class SubjectsPage extends React.PureComponent<ISubjectsPageProps, ISubjectPageStates> {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalTitle: '',
      selectedId: '',
      selectedIndex: -1,
    };
  }

  componentDidMount() {
    this.props.getSubjects();
  }

  componentWillUnmount() {
    this.props.resetStateData();
  }

  public onConfirmModal = () => {
    const { selectedIndex, selectedId } = this.state;
    this.props.deleteSubject(selectedId, selectedIndex);
    this.setState({
      modalShow: false,
      modalTitle: '',
      selectedId: '',
    });
  };

  public openModal = (modalTitle: string, id: string, idx: number) => {
    const text = `Are you sure want to delete ${modalTitle}`;
    this.setState({
      modalShow: true,
      modalTitle: text,
      selectedId: id,
      selectedIndex: idx,
    });
  };

  public renderSubjectList = () => {
    const { list } = this.props.subjectsPage;

    return list.map((item, idx) => (
      <Table.Row key={item.id}>
        <Table.Cell width={1}>
          {idx + 1}
          <Label
            as="a"
            href={item.subject_ppt_slide_url}
            color="teal"
            ribbon
          >
            <Icon name="file powerpoint" />
            Slide
          </Label>
        </Table.Cell>
        <Table.Cell>{item.subject_name}</Table.Cell>
        <Table.Cell width={3}>{formatPrintString(item.subject_category)}</Table.Cell>
        <Table.Cell width={2}>{formatPrintString(item.semester)}</Table.Cell>
        <Table.Cell width={3}>{formatPrintDate(item.created_at)}</Table.Cell>
        <Table.Cell width={4}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Button
                  id="btn-edit"
                  basic
                  fluid
                  color="teal"
                  as={Link}
                  to={`/subjects/${item.id}/config`}
                >
                  <Icon name="edit" />
                  Edit
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  fluid
                  basic
                  id="btn-delete"
                  color="red"
                  onClick={(e) => this.openModal(item.subject_name, item.id || '', idx)}
                >
                  <Icon name="trash" />
                  Delete
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.Cell>
      </Table.Row>
    ));
  };

  public sortData = (list, key) => {
    const sortedData = sortByObj<ISubjectModels>(list, key);
    this.props.setSubjectList(sortedData);
  };

  public render() {
    const { isLoading, list } = this.props.subjectsPage;
    const { modalShow, modalTitle } = this.state;

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

          <Table celled structured color="teal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>
                  No
                  <Icon
                    name="sort"
                    className="pull-right cursor-click"
                    onClick={(e) => {
                      this.sortData(list, 'id');
                    }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Subject name
                  <Icon
                    name="sort"
                    className="pull-right cursor-click"
                    onClick={(e) => {
                      this.sortData(list, 'subject_name');
                    }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell width={3}>
                  subject category
                  <Icon
                    name="sort"
                    className="pull-right cursor-click"
                    onClick={(e) => {
                      this.sortData(list, 'subject_category');
                    }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell width={2}>
                  semester
                  <Icon
                    name="sort"
                    className="pull-right cursor-click"
                    onClick={(e) => {
                      this.sortData(list, 'semester');
                    }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Created at
                  <Icon
                    name="sort"
                    className="pull-right cursor-click"
                    onClick={(e) => {
                      this.sortData(list, 'created_at');
                    }}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderSubjectList()}
            </Table.Body>
          </Table>
        </Segment>
        <ConfirmDialog
          text={modalTitle}
          isShow={modalShow}
          onCancel={() => this.setState({
            modalShow: false,
            modalTitle: '',
          })}
          onConfirm={this.onConfirmModal}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ subjectsPage, common }: IAppState) => ({
  subjectsPage,
  common,
});

const mapDispatchToProps = {
  resetStateData,
  getSubjects,
  setSubjectList,
  deleteSubject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SubjectsPage));
