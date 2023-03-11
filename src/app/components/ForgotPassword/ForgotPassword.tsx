import React, { useRef, useState } from 'react';
import {
  StyledButton,
  StyledBox,
  StyledInput,
  StyledAlert,
  Header,
  BottomText,
} from './ForgotPassword.styles';
import { UserAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { resetPassword } = UserAuth()!;
  const [error, setError] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const handleForgotPassword = async ({ email }) => {
    try {
      setError(null);
      setAlert(null);
      setLoading(true);
      await resetPassword(email);
      setAlert(`It worked! :) Reset password link has been sent to your email`);
      setLoading(false);
    } catch {
      setError('failed to reset password');
      setLoading(false);
    }
  };

  return (
    <>
      <StyledBox>
        <Header>Forgot Password?</Header>
        {alert && <Alert severity="success">{alert}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <p />
        <form onSubmit={handleSubmit(handleForgotPassword)}>
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
      <BottomText>
        Need an account? <Link to="/">Sign Up</Link>
      </BottomText>
    </>
  );
};
export default ForgotPassword;
