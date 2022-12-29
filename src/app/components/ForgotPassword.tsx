import React, { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { UserAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const { resetPassword } = UserAuth()!;
  const [error, setError] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError(null);
      setAlert(null);
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setAlert(`It worked! :) Reset password link has been sent to your email`);
      setLoading(false);
    } catch {
      setError('failed to reset password');
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password?</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {alert && (
            <div className="alert alert-success" role="alert">
              {alert}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Reset password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/">Sign Up</Link>
      </div>
    </>
  );
};
export default ForgotPassword;
