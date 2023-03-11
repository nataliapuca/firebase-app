import React, { useEffect, useState } from 'react';
import {
  StyledButton,
  StyledBox,
  StyledInput,
  StyledAlert,
  Header,
  BottomText,
} from './Landing.styles';
import { UserAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Landing = () => {
  const { currentUser, logout, currentUserDB } = UserAuth()!;

  const [error, setError] = useState<null | string>(null);
  const [alert, setAlert] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const alertMessage = JSON.stringify(currentUserDB).includes(' ')
      ? 'Profile info missing - please update your profile data'
      : null;
    setAlert(alertMessage);
  }, [currentUserDB]);

  const handlelogout = async () => {
    try {
      setError(null);
      setLoading(true);
      await logout();
      navigate('/');
      setLoading(false);
    } catch {
      setError('failed to log out');
      setLoading(false);
    }
  };

  const readUsers = async () => {
    const querySnapshot = await getDocs(collection(database, 'users'));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data().name}`);
    });
  };
  return (
    <>
      {currentUser ? (
        <>
          <StyledBox>
            <Header>Landing content</Header>
            {error && <Alert severity="error">{error}</Alert>}
            {alert && <Alert severity="warning">{alert}</Alert>}
            <p />
            <strong>Name: </strong>
            {currentUserDB.first}
            <br /> <strong>Surename: </strong>
            {currentUserDB.last ? currentUserDB.last : 'missing'}
            <br />
            <strong> Auth Email: </strong>
            {currentUser.email ? currentUser.email : 'missing'}
            <br />
            <strong>DB Email: </strong>
            {currentUserDB.email ? currentUserDB.email : 'missing'}
            <br />
            <strong>Phone number: </strong>
            {currentUserDB.phone ? currentUserDB.phone : 'missing'}
            <br /> <strong>Street: </strong>
            {currentUserDB.street ? currentUserDB.street : 'missing'}
            <br /> <strong>House number: </strong>
            {currentUserDB.houseapt ? currentUserDB.houseapt : 'missing'}
            <br />
            <strong>Postal code: </strong>
            {currentUserDB.postalcode ? currentUserDB.postalcode : 'missing'}
            <br />
            <strong>City: </strong>
            {currentUserDB.city ? currentUserDB.city : 'missing'}
            <br />
            <strong>Country: </strong>
            {currentUserDB.country ? currentUserDB.country : 'missing'}
            <br />
            <p />
            <StyledButton
              variant="contained"
              onClick={() => {
                window.location.href = '/update-profile';
              }}
            >
              Update Profile
            </StyledButton>
          </StyledBox>
          <p />
          <StyledButton
            disabled={loading}
            onClick={handlelogout}
            variant="text"
          >
            Log out
          </StyledButton>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
export default Landing;
