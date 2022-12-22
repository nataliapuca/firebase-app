import * as React from 'react';
import { Container } from 'react-bootstrap';
import Landing from '../../components/Landing';
export const LandingPage = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Landing />
      </div>
    </Container>
  );
};
