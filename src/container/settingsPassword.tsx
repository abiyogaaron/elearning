import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Container,
  Grid,
  Button,
} from 'semantic-ui-react';
import { IAppState, IPasswordSettingsPageState } from '../interface/state';
import { IFormFields } from '../interface';
import { IPasswordSettingsModels } from '../interface/model';
import {
  setErrors,
  resetStateData,
  setFormData,
  resetPassword,
} from '../redux/actions/passwordSettingPage';
import BreadcrumbsMenu from '../components/breadcrumbsMenu';
import Tabs from '../components/tabs';
import FormWrapper from '../components/formWrapper';
import { TAB_LIST_PROFILE_SETTINGS } from '../constants';
import { SKELETON_RESET_PASSWORD_FORM } from '../constants/skeleton';
import Validator from '../helper/Validator';
import { PASSWORD_SETTING_CONFIG_VALIDATION_RULES } from '../helper/validationRule';

interface IPasswordSettingsProps extends RouteComponentProps{
  passwordSettingsPage: IPasswordSettingsPageState;
  resetStateData(): void;
  setErrors(errors: { [key: string]: string }): void;
  setFormData(form: IPasswordSettingsModels): void;
  resetPassword(form: IPasswordSettingsModels): void;
}

interface IsettingsPasswordState {
  isEditMode: boolean;
  formFields: IFormFields[];
}

class SettingsPassword extends React.PureComponent<IPasswordSettingsProps, IsettingsPasswordState> {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      formFields: SKELETON_RESET_PASSWORD_FORM,
    };
  }

  componentWillUnmount() {
    this.props.resetStateData();
  }

  public toggleEditMode = () => {
    const { isEditMode } = this.state;
    this.setState({
      isEditMode: !isEditMode,
    });

    if (isEditMode) {
      this.props.setErrors({});
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...this.props.passwordSettingsPage.form };
    newForm[name] = value;

    this.props.setFormData(newForm);
  };

  public handleToggleShowPassword = (idField: number, idSection: number) => {
    this.setState((prevState) => {
      const newFormFields = [...prevState.formFields];
      const { showPassword } = newFormFields[idSection].form[idField];
      newFormFields[idSection].form[idField].showPassword = !showPassword;

      return { formFields: newFormFields };
    });
  };

  public handleSave = () => {
    const { form } = this.props.passwordSettingsPage;

    Validator.validate(form, PASSWORD_SETTING_CONFIG_VALIDATION_RULES)
      .then(async (data: IPasswordSettingsModels) => {
        this.props.resetPassword(data);
        this.setState({
          isEditMode: false,
        });
        this.props.setErrors({});
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        this.props.setErrors(errorMessages);
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
    const { form, errors, isLoading } = this.props.passwordSettingsPage;
    const { isEditMode, formFields } = this.state;
    return (
      <Container>
        <BreadcrumbsMenu
          showNextMenu={false}
          title="Profile Settings"
          iconName="settings"
        />
        <Segment raised padded color="teal" loading={isLoading}>
          <Tabs
            tabs={TAB_LIST_PROFILE_SETTINGS}
            activeTab="Reset password"
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
                <IPasswordSettingsModels>
                centered
                forms={formFields}
                handleChange={this.handleChange}
                toggleShowPassword={this.handleToggleShowPassword}
                formData={form}
                editMode={isEditMode}
                errors={errors}
              />
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ passwordSettingsPage }: IAppState) => ({
  passwordSettingsPage,
});

const mapDispatchToProps = {
  setErrors,
  resetStateData,
  setFormData,
  resetPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SettingsPassword));
