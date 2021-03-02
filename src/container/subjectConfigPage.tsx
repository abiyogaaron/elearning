import React from 'react';
import { withRouter, RouteComponentProps, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import {
  Segment,
  Container,
  Grid,
  Button,
  DropdownProps,
  Divider,
} from 'semantic-ui-react';
import BreadcrumbsMenu from '../components/breadcrumbsMenu';
import FooterForm from '../components/footerForm';
import Tabs from '../components/tabs';
import FormWrapper from '../components/formWrapper';
import { TAB_LIST_SUBJECTS, PROMPT_MESSAGE } from '../constants';
import { SKELETON_SUBJECT_CONFIG_FORM } from '../constants/skeleton';
import { ISubjectConfigPageState, IAppState, ICommonState } from '../interface/state';
import { ISubjectModels } from '../interface/model';
import {
  setErrors,
  resetStateData,
  setFormData,
  addSubject,
  getSubjectById,
  updateSubject,
} from '../redux/actions/subjectConfigPage';
import { SUBJECT_CONFIG_VALIDATION_RULES } from '../helper/validationRule';
import Validator from '../helper/Validator';

interface ISubjectConfigPageProps extends RouteComponentProps {
  subjectConfigPage: ISubjectConfigPageState;
  common: ICommonState;
  setErrors(errors: { [key: string]: string }): void;
  setFormData(form: ISubjectModels): void;
  resetStateData(): void;
  addSubject(form: ISubjectModels, history: History, userId: string): void;
  getSubjectById(id: string): void;
  updateSubject(form: ISubjectModels, id: string, userId: string): void;
}

interface ISubjectConfigPageStates {
  isEditMode: boolean;
}

class SubjectConfigPage extends React.PureComponent
  <ISubjectConfigPageProps, ISubjectConfigPageStates> {
  private subjectId: string;

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: true,
    };
    this.subjectId = props.match.params.subjectId;
  }

  componentDidMount() {
    if (this.subjectId) {
      this.setState({ isEditMode: false });
      this.props.getSubjectById(this.subjectId);
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
    const { userProfile } = this.props.common;
    Validator.validate(form, SUBJECT_CONFIG_VALIDATION_RULES)
      .then(async (data) => {
        if (this.subjectId) {
          await this.props.updateSubject(data, this.subjectId, userProfile.id || '');
          this.setState({
            isEditMode: false,
          });
        } else this.props.addSubject(data, this.props.history, userProfile.id || '');
        this.props.setErrors({});
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        this.props.setErrors(errorMessages);
      });
  };

  public toggleEditMode = () => {
    const { isEditMode } = this.state;
    const { formDefault } = this.props.subjectConfigPage;

    this.props.setFormData(formDefault);
    this.setState({
      isEditMode: !isEditMode,
    });

    if (isEditMode) {
      this.props.setFormData(formDefault);
      this.props.setErrors({});
    }
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

  public renderFooter = () => {
    const { form } = this.props.subjectConfigPage;
    if (this.subjectId) {
      return (
        <>
          <Divider />
          <FooterForm
            createdAt={form.created_at}
            createdBy={form.created_by}
            updatedAt={form.updated_at}
            updatedBy={form.updated_by}
          />
        </>
      );
    }
    return <></>;
  };

  public render() {
    const { isEditMode } = this.state;
    const { form, errors, isLoading } = this.props.subjectConfigPage;

    return (
      <Container>
        <Prompt
          when={isEditMode}
          message={PROMPT_MESSAGE}
        />
        <BreadcrumbsMenu
          showNextMenu
          title="Lesson Subject"
          iconName="book"
          menuText="Basic Config"
        />
        <Segment raised padded loading={isLoading} color="teal">
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
                centered
                forms={SKELETON_SUBJECT_CONFIG_FORM}
                editMode={isEditMode}
                handleChange={this.handleChange}
                handleSelectionChange={this.handleSelectionChange}
                formData={form}
                errors={errors}
              />
            </Grid.Row>
            {this.renderFooter()}
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ subjectConfigPage, common }: IAppState) => ({
  subjectConfigPage,
  common,
});

const mapDispatchToProps = {
  setErrors,
  setFormData,
  resetStateData,
  addSubject,
  getSubjectById,
  updateSubject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SubjectConfigPage));
