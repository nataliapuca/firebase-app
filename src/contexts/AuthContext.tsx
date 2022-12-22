import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { User as FirebaseUser } from 'firebase/auth';
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

type contextProps = {
  logout: () => void;
  currentUser: FirebaseUser | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  resetPassword: (email: string) => void;
  updateAccountEmail: (password: string) => void;
  updateAccountPassword: (email: string) => void;
  logInWithGoogle: () => void;
  currentUserDB: any;
};

const AuthContext = React.createContext<contextProps | null>(null);
export const UserAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  const { currentUserDB } = useUserData(currentUser?.uid);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateAccountPassword = (password: string) => {
    return currentUser ? updatePassword(currentUser, password) : null;
  };

  const updateAccountEmail = (email: string) => {
    return currentUser ? updateEmail(currentUser, email) : null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setCurrentUser(currentUser);
      console.log(currentUser);
    });
    return unsubscribe;
  }, []);

  const value: contextProps = {
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