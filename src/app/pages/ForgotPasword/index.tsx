import * as React from 'react';
import { Container } from 'react-bootstrap';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';

export const ForgotPasswordPage = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <ForgotPassword />
      </div>
    </Container>
  );
};
