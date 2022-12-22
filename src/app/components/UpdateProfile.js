import React, { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { UserAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updateAccountPassword, updateAccountEmail } = UserAuth();
  const [error, setError] = useState();
  const [alert, setAlert] = useState();
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async e => {
    e.preventDefault();
    try {
      setError();
      setAlert();
      setLoadingEmail(true);
      await updateAccountEmail(emailRef.current.value);
      setAlert(`It worked! :) Your email has been updated`);
      setLoadingEmail(false);
      setTimeout(() => {
        navigate('/landing-page');
      }, 4000);
    } catch {
      setError('failed to update email');
      setLoadingEmail(false);
    }
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords dont match');
    }
    try {
      setError();
      setAlert();
      setLoadingPassword(true);
      await updateAccountPassword(passwordRef.current.value);
      setAlert(`It worked! :) Your password has been updated`);
      setLoadingPassword(false);
      setTimeout(() => {
        navigate('/landing-page');
      }, 4000);
    } catch {
      setError('failed to update password');
      setLoadingPassword(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {alert && (
            <div class="alert alert-success" role="alert">
              {alert}
            </div>
          )}
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group id="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loadingEmail}>
              Update Email
            </Button>
          </Form>
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group id="password" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button
              className="w-100 mb-2"
              type="submit"
              disabled={loadingPassword}
            >
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/landing-page">landing page</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
