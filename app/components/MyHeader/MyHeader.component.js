import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyHeader = () => {
  return (
    <View style={Styles.headerContainer}>
      <View style={Styles.headerContent}>
        <Icon
          name="chevron-left"
          size={28}
          style={Styles.backIcon}
          color="#2b6079"
        />
        <Text style={Styles.headerTitle}>Gempa Bumi</Text>
        <Icon name="share-variant" size={22} color="#2b6079" />
      </View>
    </View>
  );
};

export { MyHeader };

const Styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    flex: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'GoogleSans-Bold',
    color: '#2b6079',
  },
  backIcon: {
    marginTop: -4,
  },
});
