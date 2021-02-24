import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import {
  Segment,
  Container,
  Grid,
  Button,
  DropdownProps,
} from 'semantic-ui-react';
import BreadcrumbsMenu from '../components/breadcrumbsMenu';
import Tabs from '../components/tabs';
import FormWrapper from '../components/formWrapper';
import { TAB_LIST_SUBJECTS } from '../constants';
import { SKELETON_FORM_FIELDS } from '../constants/skeleton';
import { ISubjectConfigPageState, IAppState } from '../interface/state';
import { ISubjectModels } from '../interface/model';
import {
  setErrors,
  resetStateData,
  setFormData,
  addSubject,
} from '../redux/actions/subjectConfigPage';
import { SUBJECT_CONFIG_VALIDATION_RULES } from '../helper/validationRule';
import Validator from '../helper/Validator';

interface ISubjectConfigPageProps extends RouteComponentProps {
  subjectConfigPage: ISubjectConfigPageState;
  setErrors(errors: { [key: string]: string }): void;
  setFormData(form: ISubjectModels): void;
  resetStateData(): void;
  addSubject(form: ISubjectModels, history: History): void;
}

interface ISubjectConfigPageStates {
  isEditMode: boolean;
}

class SubjectConfigPage extends React.PureComponent
  <ISubjectConfigPageProps, ISubjectConfigPageStates> {
  private campaignId: number;

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: true,
    };
    this.campaignId = props.match.params.campaignId;
  }

  componentDidMount() {
    if (this.campaignId) {
      this.setState({ isEditMode: false });
    }
  }

  componentWillUnmount() {
    this.props.resetStateData();
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...this.props.subjectConfigPage.form };
    newForm[name] = value;

    this.props.setFormData(newForm);
  };

  public handleSelectionChange = (e: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    const { name, value } = data;
    const newForm = { ...this.props.subjectConfigPage.form };
    newForm[name] = value;

    this.props.setFormData(newForm);
  };

  public handleSave = () => {
    const { form } = this.props.subjectConfigPage;
    Validator.validate(form, SUBJECT_CONFIG_VALIDATION_RULES)
      .then(async (data) => {
        this.props.addSubject(data, this.props.history);
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        this.props.setErrors(errorMessages);
      });
  };

  public toggleEditMode = () => {
    const { isEditMode } = this.state;
    this.setState({
      isEditMode: !isEditMode,
    });
  };

  public renderButton = () => {
    const { isEditMode } = this.state;
    if (isEditMode) {
      return (
        <div className="pull-right">
          <Button
            id="btn-cancel"
            size="medium"
            onClick={this.toggleEditMode}
          >
            Cancel
          </Button>
          <Button
            id="btn-save"
            size="medium"
            color="teal"
            className="ml-8"
            onClick={this.handleSave}
          >
            Save
          </Button>
        </div>
      );
    }
    return (
      <div className="pull-right">
        <Button color="teal" onClick={this.toggleEditMode}>
          Edit
        </Button>
      </div>
    );
  };

  public render() {
    const { isEditMode } = this.state;
    const { form, errors, isLoading } = this.props.subjectConfigPage;

    return (
      <Container>
        <BreadcrumbsMenu
          showNextMenu
          title="Lesson Subject"
          iconName="book"
          menuText="Basic Config"
        />
        <Segment raised padded loading={isLoading}>
          <Tabs
            tabs={TAB_LIST_SUBJECTS}
            activeTab="Basic config"
          />
          <Grid
            verticalAlign="middle"
            columns={1}
          >
            <Grid.Row>
              <Grid.Column mobile="16" computer="16" tablet="16">
                {this.renderButton()}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <FormWrapper
                <ISubjectModels>
                forms={SKELETON_FORM_FIELDS}
                editMode={isEditMode}
                handleChange={this.handleChange}
                handleSelectionChange={this.handleSelectionChange}
                formData={form}
                errors={errors}
              />
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ subjectConfigPage }: IAppState) => ({
  subjectConfigPage,
});

const mapDispatchToProps = {
  setErrors,
  setFormData,
  resetStateData,
  addSubject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SubjectConfigPage));
