import * as React from 'react';
import { Container } from 'react-bootstrap';
import Landing from '../../components/Landing';
export const LandingPage = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <Landing />
    </Container>
  );
};
