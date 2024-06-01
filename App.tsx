import { NativeBaseProvider, StatusBar } from 'native-base';

import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </AuthProvider>
 


  );
}