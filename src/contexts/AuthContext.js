import React, { useContext, useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import useUserData from '../app/hooks/useUserData';

const AuthContext = React.createContext();
export const UserAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  console.log('context');

  const [currentUser, setCurrentUser] = useState({});
  const { currentUserDB } = useUserData(currentUser.uid);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateAccountPassword = password => {
    return updatePassword(currentUser, password);
  };

  const updateAccountEmail = email => {
    return updateEmail(currentUser, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setCurrentUser(currentUser);
      console.log(currentUser.uid);
    });
    return unsubscribe;
  }, []);

  const value = {
    logout,
    currentUser,
    signup,
    login,
    resetPassword,
    updateAccountEmail,
    updateAccountPassword,
    logInWithGoogle,
    currentUserDB,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
