import React, { useRef, useState } from 'react';
import {
  StyledButton,
  StyledBox,
  StyledInput,
  StyledAlert,
  Header,
  BottomText,
} from './UpdateProfile.styles';
import { UserAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';

const UpdateProfile = () => {
  const { updateAccountPassword, updateAccountEmail } = UserAuth()!;
  const [error, setError] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const navigate = useNavigate();

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

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    getValues,
    trigger,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const handleEmailSubmit = async ({ email }) => {
    try {
      setError(null);
      setAlert(null);
      setLoadingEmail(true);
      await updateAccountEmail(email);
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

  const handlePasswordSubmit = async ({ passwordConfirm }) => {
    try {
      setError(null);
      setAlert(null);
      setLoadingPassword(true);
      await updateAccountPassword(passwordConfirm);
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
        <Header>Update Profile</Header>
        {alert && <Alert severity="success">{alert}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <p />
        <form key={1} onSubmit={handleSubmit(handleEmailSubmit)}>
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
            disabled={!isValid || loadingEmail}
            variant="contained"
          >
            Update Email
          </StyledButton>
        </form>
        <p />
        <form key={2} onSubmit={handleSubmit2(handlePasswordSubmit)}>
          <StyledInput
            {...register2('password', {
              required: 'Password is required',
              onChange: validatePassword,
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            variant="outlined"
          />
          <StyledAlert>{errors2.password?.message}</StyledAlert>
          <StyledInput
            {...register2('passwordConfirm', {
              required: 'Password confirmation is required',
              validate: { checkEmail: validateConfirmPassword },
            })}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Confirm password"
            variant="outlined"
          />
          <StyledAlert>{errors2.passwordConfirm?.message}</StyledAlert>
          <StyledButton
            type="submit"
            disabled={!isValid2 || loadingPassword}
            variant="contained"
          >
            Update Password
          </StyledButton>
        </form>
      </StyledBox>

      <BottomText>
        <Link to="/landing-page">Landing Page</Link>
      </BottomText>
    </>
  );
};

export default UpdateProfile;
