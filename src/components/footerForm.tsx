import React from 'react';
import {
  Grid,
  Label,
  Icon,
} from 'semantic-ui-react';
import { formatPrintDate } from '../helper';

interface IFooterFormProps {
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  updatedBy: string;
}

const footerForm = ({
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
}: IFooterFormProps) => (
  <Grid.Row columns={4} textAlign="center">
    <Grid.Column mobile="16" computer="4" tablet="16">
      <Label>
        <Icon name="calendar alternate" />
        Created at
        {' '}
        {formatPrintDate(createdAt)}
      </Label>
    </Grid.Column>
    <Grid.Column mobile="16" computer="4" tablet="16">
      <Label>
        <Icon name="user" />
        Created by
        {' '}
        {createdBy}
      </Label>
    </Grid.Column>
    <Grid.Column mobile="16" computer="4" tablet="16">
      <Label>
        <Icon name="calendar alternate" />
        Updated at
        {' '}
        {formatPrintDate(updatedAt)}
      </Label>
    </Grid.Column>
    <Grid.Column mobile="16" computer="4" tablet="16">
      <Label>
        <Icon name="user" />
        Updated by
        {' '}
        {updatedBy}
      </Label>
    </Grid.Column>
  </Grid.Row>
);

export default React.memo(footerForm);
