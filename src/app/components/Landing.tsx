import React, { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { UserAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../firebase';
import Spinner from './Spinner/Spinner';

const Landing = () => {
  const { currentUser, logout, currentUserDB } = UserAuth()!;
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
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
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Landing content</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <strong> Auth Email: </strong>
              {currentUser.email}
              <br />
              <strong>DB Email: </strong>
              {currentUserDB.email}
              <br />
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                update profile
              </Link>
            </Card.Body>
          </Card>
          <Button
            disabled={loading}
            variant="link"
            onClick={handlelogout}
            className="w-100 text-center mt-2"
          >
            Log out
          </Button>
          <Button className="w-100 mb-2" onClick={readUsers}>
            Read Users
          </Button>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default Landing;
