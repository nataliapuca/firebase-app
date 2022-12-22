import React, { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { UserAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logInWithGoogle } = UserAuth();
  const [error, setError] = useState();
  const [alert, setAlert] = useState();
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignGoogle, setLoadingSignGoogle] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async e => {
    e.preventDefault();
    try {
      setError();
      setAlert();
      setLoadingSignIn(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setAlert(`You logged in! :) Wait to be redirected to Landing page`);
      setLoadingSignIn(false);
      setTimeout(() => {
        navigate('/landing-page');
      }, 4000);
    } catch {
      setError('failed to log in');
      setLoadingSignIn(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      setError();
      setAlert();
      setLoadingSignGoogle(true);
      await logInWithGoogle();
      setAlert(`You logged in! :) Wait to be redirected to Landing page`);
      setLoadingSignGoogle(false);
      setTimeout(() => {
        navigate('/landing-page');
      }, 4000);
    } catch {
      setError('failed to log in with google');
      setLoadingSignGoogle(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
          <Form onSubmit={handleSignIn}>
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
            <Button className="w-100" type="submit" disabled={loadingSignIn}>
              Log In
            </Button>
          </Form>
          <Button
            className="w-100 mt-2 "
            onClick={handleSignInWithGoogle}
            disabled={loadingSignGoogle}
          >
            Log In with google
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Forgot password? Click <Link to="/forgot-password">here</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/">Sign Up</Link>
      </div>
    </>
  );
};
export default LogIn;
