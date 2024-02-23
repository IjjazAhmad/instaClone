// AuthContextProvider.ts

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  AuthContextProps,
  AuthState,
  AuthAction,
  FirebaseUser,
  UserProfileData,
} from '../constants/AllTypes';

const AuthContext = createContext({} as AuthContextProps);
const initialState: AuthState = { isAuth: false, user: {} };

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "Login":
      return { isAuth: true, user: action.payload.userData || {} };
    case "Logout":
      return { isAuth: false, user: {} };
    default:
      return state;
  }
};

export default function AuthContextProvider(props: { children: React.ReactNode }) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    auth().onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        readUserProfile(user);
      } else {
        setIsAppLoading(false);
      }
    });
  }, [auth]);

  const readUserProfile = (user: FirebaseUser) => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((documentSnapshot) => {
        const userData: UserProfileData | undefined = documentSnapshot.data() as UserProfileData;
        dispatch({ type: "Login", payload: { userData } });
      });
    setTimeout(() => {
      setIsAppLoading(false);
    }, 2000)
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAppLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
