import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { xml2json } from 'xml-js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { mapStyle } from '../../../MapStyle';

function LatestEarthquake() {
  const markerRef = useRef(null);
  const [dataGempa, setDataGempa] = useState({});
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getLatestEq();
  }, []);

  const onRegionChangeComplete = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }
  };

  const getLatestEq = async () => {
    const response = await fetch('https://data.bmkg.go.id/autogempa.xml');
    const data = await response.text();
    const dataJson = JSON.parse(
      xml2json(data, {
        compact: true,
        ignoreDeclaration: true,
      }),
    );
    const coordStr = dataJson.Infogempa.gempa.point.coordinates._text;
    const split = coordStr.split(',');
    setCoords({
      latitude: parseFloat(split[1]),
      longitude: parseFloat(split[0]),
    });
    setDataGempa(dataJson.Infogempa.gempa);
  };

  const renderCredit = () => (
    <View style={Styles.credit}>
      <Text style={Styles.creditText}>
        Source Data: https://data.bmkg.go.id/
      </Text>
    </View>
  );

  const renderDataMaps = () => (
    <MapView
      provider={MapView.PROVIDER_GOOGLE}
      style={Styles.maps}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
      region={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
      showsCompass={false}
      onRegionChangeComplete={onRegionChangeComplete}
      maxZoomLevel={6}>
      <MapView.Marker
        ref={markerRef}
        coordinate={{
          latitude: coords.latitude,
          longitude: coords.longitude,
        }}>
        <Image
          source={require('../../assets/images/gempa.png')}
          style={Styles.markerIcon}
        />
      </MapView.Marker>
    </MapView>
  );

  const renderDetailGempa = () => (
    <View style={Styles.detailGempa}>
      <View style={Styles.flexRow}>
        <View style={Styles.descWrapper}>
          <Icon name="clock-outline" size={23} color="#2b6079" />
          <Text style={Styles.title}>{dataGempa?.Tanggal?._text}</Text>
          <Text style={Styles.desc}>{dataGempa?.Jam?._text}</Text>
        </View>
        <View style={Styles.separator} />
        <View style={Styles.descWrapper}>
          <Icon name="access-point" size={23} color="#2b6079" />
          <Text style={Styles.title}>{dataGempa?.Magnitude?._text}</Text>
          <Text style={Styles.desc}>Magnitudo</Text>
        </View>
        <View style={Styles.separator} />
        <View style={Styles.descWrapper}>
          <Icon name="adjust" size={23} color="#2b6079" />
          <Text style={Styles.title}>{dataGempa?.Kedalaman?._text}</Text>
          <Text style={Styles.desc}>Kedalaman</Text>
        </View>
      </View>
      <View style={Styles.separatorHorizontal} />
      <View>
        <Text style={Styles.eqLocationTitle}>Lokasi Gempa</Text>
        <View style={Styles.eqLocationWrapper}>
          <View style={Styles.eqLocationData}>
            <Icon
              name="map-marker-radius"
              size={23}
              color="#2b6079"
              style={Styles.icon}
            />
            <Text style={[Styles.descText]}>
              Pusat gempa berada di {dataGempa?.Wilayah1?._text}
            </Text>
          </View>
          <View style={[Styles.eqLocationData, Styles.right]}>
            <Icon name="crosshairs-gps" size={23} color="#2b6079" />
            <Text style={Styles.descText}>
              {dataGempa?.Lintang?._text}-{dataGempa?.Bujur?._text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={Styles.container}>
      {renderCredit()}
      {renderDataMaps()}
      {renderDetailGempa()}
    </View>
  );
}

export default LatestEarthquake;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    height: '100%',
    width: '100%',
  },
  detailGempa: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'rgba(255,255,255,.9)',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  markerIcon: {
    height: 30,
    width: 22,
  },
  descWrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'GoogleSans-Medium',
    paddingTop: 5,
    color: '#2b6079',
  },
  desc: {
    fontSize: 13,
    color: 'grey',
    fontFamily: 'GoogleSans-Regular',
    paddingTop: 5,
  },
  separator: {
    height: 60,
    width: 1,
    backgroundColor: '#d1d1d1',
  },
  separatorHorizontal: {
    marginTop: 10,
    width: '100%',
    height: 1,
    backgroundColor: '#d1d1d1',
  },
  eqLocationTitle: {
    fontSize: 13,
    paddingTop: 8,
    paddingLeft: 20,
    color: 'grey',
    fontFamily: 'GoogleSans-Regular',
  },
  eqLocationWrapper: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  eqLocationData: {
    flexDirection: 'row',
    flex: 1,
  },
  descText: {
    paddingTop: 5,
    paddingLeft: 5,
    fontFamily: 'GoogleSans-Regular',
    color: 'grey',
    paddingRight: 10,
  },
  icon: {
    paddingTop: 10,
  },
  right: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  credit: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9999,
  },
  creditText: {
    textAlign: 'right',
    paddingRight: 10,
    paddingLeft: 5,
    fontFamily: 'GoogleSans-Regular',
    color: 'grey',
  },
});
