import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/Header';

export default function MainScreen() {

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {/* Your PRODUCT screen content */}
      <Text>PRODUCT Screen Content</Text>
    </View>
  );
}