import React from 'react';
import '../styles/ErrorMessage.modules.scss';

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = React.memo(({ message }: IErrorMessageProps) => {
  if (message) {
    return (
      <p className="error-message">{message}</p>
    );
  }
  return null;
});

export default ErrorMessage;
