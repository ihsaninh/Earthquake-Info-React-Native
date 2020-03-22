import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TopTab } from '../TopTabNavigation';
import { MyHeader } from '../../components/MyHeader/MyHeader.component';

const Stack = createStackNavigator();

const styleRefresh = { paddingRight: 15 };

function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <MyHeader {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="Gempa Bumi Terkini"
        component={TopTab}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => null}>
              <Icon
                name="share-variant"
                color="#ffffff"
                size={24}
                style={styleRefresh}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export { RootNavigation };
