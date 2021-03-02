import React from 'react';
import {
  Form,
  Grid,
  Header,
  DropdownProps,
  Input,
} from 'semantic-ui-react';
import { IFormFields, IFields } from '../interface';
import ErrorMessage from './errorMessage';

interface IFormWrapperProps<T> {
  forms: IFormFields[];
  editMode: boolean;
  formData: T;
  errors: { [key: string]: string };
  centered: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectionChange?: (e: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;
  toggleShowPassword?: (idField: number, idSection: number) => void;
}

class FormWrapper<T> extends React.PureComponent<IFormWrapperProps<T>> {
  public chooseField = (form: IFields, idField: number, idSection: number) => {
    const {
      editMode,
      formData,
      errors,
      handleChange,
      handleSelectionChange,
      toggleShowPassword,
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
    } if (form.type === 'password') {
      return (
        <>
          <Input
            className={errors[form.key] ? 'input-error' : ''}
            id={form.id}
            action={{
              labelPosition: 'right',
              icon: form.showPassword ? 'lock' : 'unlock',
              content: form.showPassword ? 'hide' : 'show',
              onClick: () => {
                if (toggleShowPassword) {
                  toggleShowPassword(idField, idSection);
                }
              },
            }}
            placeholder={form.placeholder}
            disabled={!editMode}
            name={form.key}
            value={formData[form.key]}
            error={!!errors[form.key]}
            onChange={handleChange}
            type={form.showPassword ? 'text' : 'password'}
          />
          <ErrorMessage message={errors[form.key]} />
        </>
      );
    }
    return null;
  };

  public renderFields = (forms: IFields[], idSection: number) => {
    const content = forms.map((form, idx) => (
      <Form.Field key={`${form.id}`}>
        <label htmlFor={form.id}>{form.label}</label>
        {this.chooseField(form, idx, idSection)}
      </Form.Field>
    ));
    return content;
  };

  public renderSection = () => {
    const { forms, centered } = this.props;
    const content = forms.map((section, idx) => (
      <Grid columns={2} key={`${section.title}`} centered={centered}>
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
              {this.renderFields(section.form, idx)}
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
