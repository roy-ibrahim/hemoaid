// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import WelcomeScreen from './src/Screens/WelcomeScreen';

const App = () => {
  return (
    // <NavigationContainer>
    //   <TabNavigation />
    // </NavigationContainer>
    <WelcomeScreen />
  );
};

export default App;