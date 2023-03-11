import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export const StyledButton = styled(Button)`
  width: 100%;
`;
export const StyledBox = styled(Box)`
  padding: 30px;
  border: 1px solid grey;
  border-radius: 20px;
`;
export const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;
export const StyledAlert = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  padding: 5px 12px;
  font-size: 0.875rem;
  color: #0077b6;
  height: 31px;
  margin: 0;
`;
export const Header = styled.h2`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const BottomText = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  width: 100%;
  margin-top: 16px;
`;
