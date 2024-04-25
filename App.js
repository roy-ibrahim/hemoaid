// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import StackNavigation from './src/navigation/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    //<WelcomeScreen />
  );
};

export default App;