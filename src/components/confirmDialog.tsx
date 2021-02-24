import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface IConfirmDialogProps {
  text: string;
  isShow: boolean;
  onConfirm(): void;
  onCancel(): void;
}

const ConfirmDialog = React.memo((
  {
    isShow,
    onCancel,
    onConfirm,
    text,
  }: IConfirmDialogProps,
) => (
  <Modal size="small" open={isShow} onClose={onCancel}>
    <Modal.Content>
      <h4>{text}</h4>
    </Modal.Content>
    <Modal.Actions>
      <Button id="btn-confirm-no" onClick={onCancel} negative>
        No
      </Button>
      <Button
        id="btn-confirm-yes"
        positive
        icon="checkmark"
        labelPosition="right"
        content="Yes"
        onClick={onConfirm}
      />
    </Modal.Actions>
  </Modal>
));

export default ConfirmDialog;
