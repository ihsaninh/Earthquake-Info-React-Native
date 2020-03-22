import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LatestEarthquake from '../../screens/LatestEarthquake/LatestEarthquake.screen';

const Tab = createMaterialTopTabNavigator();

function EarthquakeList() {
  return (
    <View>
      <Text>LatestEarthquake</Text>
    </View>
  );
}

function EarthquakeFelt() {
  return (
    <View>
      <Text>LatestEarthquake</Text>
    </View>
  );
}

const tabBarOptions = {
  activeTintColor: '#4bcffa',
  inactiveTintColor: '#2b6079',
  labelStyle: {
    fontFamily: 'GoogleSans-Medium',
    textTransform: 'capitalize',
    fontSize: 15,
  },
  indicatorStyle: { backgroundColor: '#4bcffa' },
};

function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Terkini"
      tabBarOptions={tabBarOptions}
      backBehavior="initialRoute">
      <Tab.Screen name="Terkini" component={LatestEarthquake} />
      <Tab.Screen name="M 5.0+" component={EarthquakeList} />
      <Tab.Screen name="Dirasakan" component={EarthquakeFelt} />
    </Tab.Navigator>
  );
}

export { TopTab };
