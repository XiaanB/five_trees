import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function AboutUsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
      
          latitude: -43.50257416921142,
          longitude: 172.58669100802567,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: -43.50257416921142, longitude: 172.58669100802567 }}
          title="Five Trees Ltd"
          description="119 Brookside Terrace, Bryndwr, Christchurch 8053"        
        /> 

        <Circle
          center={{ latitude: -43.50257416921142, longitude: 172.58669100802567 }}
          radius={1000}
          strokeColor="rgba(255, 0, 0, 0.5)"
          fillColor="rgba(255, 0, 0, 0.2)"  
        />
      </MapView>
      <Text style={{ position: 'absolute', bottom: 20, left: 20 }}>
        Contact Us
      </Text>
    </View>    
  );
}