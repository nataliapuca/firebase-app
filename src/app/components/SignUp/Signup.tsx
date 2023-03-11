import React, { useState } from 'react';
import {
  StyledButton,
  StyledBox,
  StyledInput,
  StyledAlert,
  Header,
  BottomText,
} from './SignUp.styles';
import { UserAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';

const Signup = () => {
  const [alert, setAlert] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { signup } = UserAuth()!;

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmitSignUp = async ({ email, passwordConfirm }) => {
    try {
      setError(null);
      setAlert(null);
      setLoading(true);
      console.log(email);
      console.log(passwordConfirm);
      await signup(email, passwordConfirm);
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

  const validateConfirmPassword = (confirmPassword: string) => {
    const password = getValues('password');

    return confirmPassword === password || `Passwords dont match`;
  };

  const validatePassword = () => {
    const confirmPassword = getValues('passwordConfirm');

    if (!confirmPassword.length) return;

    trigger('passwordConfirm');
  };

  return (
    <>
      <StyledBox>
        <Header>Sign Up</Header>
        {alert && <Alert severity="success">{alert}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <p />
        <form onSubmit={handleSubmit(handleSubmitSignUp)}>
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
              onChange: validatePassword,
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            variant="outlined"
          />
          <StyledAlert>{errors.password?.message}</StyledAlert>
          <StyledInput
            {...register('passwordConfirm', {
              required: 'Password confirmation is required',
              validate: { checkEmail: validateConfirmPassword },
            })}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Confirm password"
            variant="outlined"
          />
          <StyledAlert>{errors.passwordConfirm?.message}</StyledAlert>
          <StyledButton
            type="submit"
            disabled={!isValid || loading}
            variant="contained"
          >
            SUBMIT
          </StyledButton>
        </form>
      </StyledBox>
      <BottomText>
        Already have an account? <Link to="/login">Log In</Link>
      </BottomText>
    </>
  );
};
export default Signup;
