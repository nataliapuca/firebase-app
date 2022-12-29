import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { UserAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [error, setError] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signup } = UserAuth()!;

  const handleSubmit = async e => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords dont match');
    }
    try {
      setError(null);
      setAlert(null);
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setAlert(`You signed up! :) Wait to be redirected to Log In page`);
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch {
      setLoading(false);
      setError('failed to sign up');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Button className="w-100" type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};
export default Signup;
