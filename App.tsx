import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Navigation from './src/navigations/Navigation';
import AuthContextProvider from './src/context/AuthContext';
import { Store } from './src/store/store';
import { Provider } from 'react-redux';
export default function App() {
  // const {isAppLoading}:any = useAuthContext()
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 5000);
  }, [])
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Provider store={Store}>
          <Navigation />
        </Provider>
      </AuthContextProvider>
      <Toast />
    </NavigationContainer>
  )
}