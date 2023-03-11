import * as React from 'react';
import { Container } from 'react-bootstrap';
import LogIn from '../../components/LogIn/LogIn';
export const LogInPage = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <LogIn />
      </div>
    </Container>
  );
};
