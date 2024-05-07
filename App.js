// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import StackNavigation from './src/navigation/StackNavigation';
import { firebase } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "./src/config/firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const[userid, setUserid] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserid(user.user.userid);
    });
  }, []);
  return (

    <NavigationContainer>
      {user? (
        <TabNavigation userid={{userid}} />
      ) : (
        <StackNavigation />
      )}
    </NavigationContainer>
    //<WelcomeScreen />
  );
};

export default App;