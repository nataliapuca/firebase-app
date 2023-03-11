import React, { useState } from 'react';
import {
  StyledButton,
  StyledBox,
  StyledInput,
  StyledAlert,
  Header,
  BottomText,
} from './LogIn.styles';
import { UserAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';

const LogIn = () => {
  const { login, logInWithGoogle } = UserAuth()!;
  const [error, setError] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
  const [loadingSignGoogle, setLoadingSignGoogle] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async ({ email, password }) => {
    try {
      setError(null);
      setAlert(null);
      setLoadingSignIn(true);
      await login(email, password);
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
      setError(null);
      setAlert(null);
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
      <StyledBox>
        <Header>Log In</Header>
        {alert && <Alert severity="success">{alert}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <p />
        <form onSubmit={handleSubmit(handleSignIn)}>
          <StyledInput
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            variant="outlined"
          />

          <StyledAlert>{errors.email?.message}</StyledAlert>

          <StyledInput
            {...register('password', {
              required: 'Password is required',
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            variant="outlined"
          />
          <StyledAlert>{errors.password?.message}</StyledAlert>

          <StyledButton
            type="submit"
            disabled={!isValid || loadingSignIn}
            variant="contained"
          >
            Log In
          </StyledButton>
        </form>
        <p></p>
        <StyledButton
          onClick={handleSignInWithGoogle}
          disabled={loadingSignGoogle}
          variant="contained"
        >
          Log in with Google
        </StyledButton>
      </StyledBox>

      <BottomText>
        Forgot password? Click <Link to="/forgot-password">here</Link>
      </BottomText>
      <BottomText>
        Need an account? <Link to="/">Sign Up</Link>
      </BottomText>
    </>
  );
};
export default LogIn;
