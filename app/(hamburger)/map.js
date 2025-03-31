import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -43.50257416921142,
          longitude: 172.58669100802567,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: -43.50257416921142,
            longitude: 172.58669100802567,
          }}
          title="Five Trees Ltd"
          description="119 Brookside Terrace, Bryndwr, Christchurch 8053"
        />

        <Circle
          center={{
            latitude: -43.50257416921142,
            longitude: 172.58669100802567,
          }}
          radius={1000}
          strokeColor="rgba(255, 0, 0, 0.5)"
          fillColor="rgba(255, 0, 0, 0.2)"
        />
      </MapView>

      <Text style={styles.contactText}>Contact Us</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contactText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
});
