import React from 'react';
import { withRouter, RouteComponentProps, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Container,
  Grid,
  Button,
  Item,
  Label,
  Icon,
} from 'semantic-ui-react';
import { IAppState, IProfileSettingsPageState, ICommonState } from '../interface/state';
import { IUserModels } from '../interface/model';
import BreadcrumbsMenu from '../components/breadcrumbsMenu';
import Tabs from '../components/tabs';
import FormWrapper from '../components/formWrapper';
import { TAB_LIST_PROFILE_SETTINGS, PROMPT_MESSAGE } from '../constants';
import { SKELETON_SETTING_PROFILE_FORM } from '../constants/skeleton';
import {
  setErrors,
  resetStateData,
  setFormData,
  setFormDefaultData,
  getUserProfile,
  saveProfileSettings,
} from '../redux/actions/profileSettingPage';
import Firebase from '../service';
import Validator from '../helper/Validator';
import { PROFILE_SETTINGS_CONFIG_VALIDATION_RULES } from '../helper/validationRule';

interface ISettingsProfileProps extends RouteComponentProps {
  common: ICommonState,
  profileSettingsPage: IProfileSettingsPageState;
  resetStateData(): void;
  setErrors(errors: { [key: string]: string }): void;
  setFormData(form: IUserModels): void;
  setFormDefaultData(form: IUserModels): void;
  getUserProfile(email: string): void;
  saveProfileSettings(form: IUserModels, id: string): void;
}

interface ISttingsProfileStates {
  isEditMode: boolean;
}

class SettingsProfile extends React.PureComponent
  <ISettingsProfileProps, ISttingsProfileStates> {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
    };
  }

  componentDidMount() {
    const firebase = new Firebase();
    const user = firebase.getAuth().currentUser;
    if (user) {
      this.props.getUserProfile(user.email);
    }
  }

  componentWillUnmount() {
    this.props.resetStateData();
  }

  componentDidUpdate(prev: ISettingsProfileProps) {
    const { pageLoading, userProfile } = this.props.common;
    // handling if user reload page
    if (pageLoading && prev.common.userProfile !== userProfile) {
      this.props.setFormData(userProfile);
      this.props.setFormDefaultData(userProfile);
    }
  }

  public toggleEditMode = () => {
    const { isEditMode } = this.state;
    const { formDefault } = this.props.profileSettingsPage;

    this.setState({
      isEditMode: !isEditMode,
    });

    if (isEditMode) {
      this.props.setFormData(formDefault);
      this.props.setErrors({});
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...this.props.profileSettingsPage.form };
    newForm[name] = value;

    this.props.setFormData(newForm);
  };

  public handleSave = () => {
    const { form } = this.props.profileSettingsPage;

    Validator.validate(form, PROFILE_SETTINGS_CONFIG_VALIDATION_RULES)
      .then(async (data: IUserModels) => {
        this.props.saveProfileSettings(data, data.id || '');
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

  public renderStatusUser = () => {
    const { form } = this.props.profileSettingsPage;
    if (form.user_status_active) {
      return (
        <Label color="teal">
          <Icon name="checkmark" />
          Active
        </Label>
      );
    }
    return (
      <Label color="red">
        <Icon name="close" />
        Terminated
      </Label>
    );
  };

  public renderStatusVerification = () => {
    const { form } = this.props.profileSettingsPage;
    if (form.user_isVerified) {
      return (
        <Label color="teal">
          <Icon name="mail" />
          Verified
        </Label>
      );
    }
    return (
      <Label color="red">
        <Icon name="mail" />
        Unverified
      </Label>
    );
  };

  public render() {
    const { form, errors, isLoading } = this.props.profileSettingsPage;
    const { isEditMode } = this.state;
    return (
      <Container>
        <Prompt
          when={isEditMode}
          message={PROMPT_MESSAGE}
        />
        <BreadcrumbsMenu
          showNextMenu={false}
          title="Profile Settings"
          iconName="settings"
        />
        <Segment raised padded color="teal" loading={isLoading}>
          <Tabs
            tabs={TAB_LIST_PROFILE_SETTINGS}
            activeTab="Profile setting"
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
            <Grid.Row centered>
              <Item.Group>
                <Item>
                  <Item.Image
                    circular
                    size="small"
                    src={
                      form.user_photo_url
                        ? form.user_photo_url
                        : 'http://via.placeholder.com/256x256'
                    }
                  />
                  <Item.Content>
                    <Item.Header>{form.user_email}</Item.Header>
                    <Item.Meta>{form.user_role}</Item.Meta>
                    <Item.Description>
                      {this.renderStatusUser()}
                    </Item.Description>
                    <Item.Description>
                      {this.renderStatusVerification()}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Row>
            <Grid.Row>
              <FormWrapper
                <IUserModels>
                centered
                forms={SKELETON_SETTING_PROFILE_FORM}
                handleChange={this.handleChange}
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

const mapStateToProps = ({ profileSettingsPage, common }: IAppState) => ({
  profileSettingsPage,
  common,
});

const mapDispatchToProps = {
  resetStateData,
  setFormData,
  setErrors,
  getUserProfile,
  setFormDefaultData,
  saveProfileSettings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SettingsProfile));
