import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/router/index'
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar 
          backgroundColor='#1d1d2e'
          barStyle='light-content'
          translucent={false}
        />
        <Routes />
      </AuthProvider>   
    </NavigationContainer>
  );
}
