import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { RootNavigation } from './app/navigations/RootNavigation/';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1B232E" />
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
