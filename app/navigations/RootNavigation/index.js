import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { TopTab } from '../TopTabNavigation';
import { MyHeader } from '../../components/MyHeader/MyHeader.component';

const Stack = createStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <MyHeader {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Gempa Bumi Terkini" component={TopTab} />
    </Stack.Navigator>
  );
}

export { RootNavigation };
