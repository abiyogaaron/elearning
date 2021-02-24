import React from 'react';
import {
  Form,
  Grid,
  Header,
  DropdownProps,
} from 'semantic-ui-react';
import { IFormFields, IFields } from '../interface';
import ErrorMessage from './errorMessage';

interface IFormWrapperProps<T> {
  forms: IFormFields[];
  editMode: boolean;
  formData: T;
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectionChange: (e: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;
}

class FormWrapper<T> extends React.PureComponent<IFormWrapperProps<T>> {
  public chooseField = (form: IFields) => {
    const {
      editMode,
      formData,
      errors,
      handleChange,
      handleSelectionChange,
    } = this.props;
    if (form.type === 'text') {
      return (
        <>
          <Form.Input
            id={form.id}
            placeholder={form.placeholder}
            disabled={!editMode}
            name={form.key}
            value={formData[form.key]}
            error={!!errors[form.key]}
            onChange={handleChange}
          />
          <ErrorMessage message={errors[form.key]} />
        </>
      );
    } if (form.type === 'dropdown') {
      return (
        <>
          <Form.Dropdown
            id={form.id}
            name={form.key}
            value={formData[form.key]}
            error={!!errors[form.key]}
            placeholder={form.placeholder}
            disabled={!editMode}
            search
            selection
            closeOnChange
            options={form.options || []}
            onChange={handleSelectionChange}
          />
          <ErrorMessage message={errors[form.key]} />
        </>
      );
    }
    return null;
  };

  public renderFields = (forms: IFields[]) => {
    const content = forms.map((form) => (
      <Form.Field key={`${form.id}`}>
        <label htmlFor={form.id}>{form.label}</label>
        {this.chooseField(form)}
      </Form.Field>
    ));
    return content;
  };

  public renderSection = () => {
    const { forms } = this.props;
    const content = forms.map((section) => (
      <Grid columns={2} key={`${section.title}`} centered>
        <Grid.Row>
          <Grid.Column mobile="16" computer="8" tablet="8">
            <Header as="h2" color="teal">
              {section.title}
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column mobile="16" computer="8" tablet="8">
            <Form>
              {this.renderFields(section.form)}
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ));
    return content;
  };

  public render() {
    return this.renderSection();
  }
}

export default FormWrapper;
