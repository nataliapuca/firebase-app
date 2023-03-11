import * as React from 'react';
import { Container } from 'react-bootstrap';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';

export const UpdateProfilePage = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <UpdateProfile />
      </div>
    </Container>
  );
};
