import React from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { MotiView } from 'moti';
import { FontAwesome } from '@expo/vector-icons';
import Header from '@/components/Header';
import { useEffect } from 'react';


const { width } = Dimensions.get('window');

const specials = [
    { id: '1', title: '50% Off Hand Wash', image: 'https://example.com/special1.jpg' },
    { id: '2', title: 'Buy 1 Get 1 Free', image: 'https://example.com/special2.jpg' },
    { id: '3', title: 'Limited Time Discount', image: 'https://example.com/special3.jpg' },
];


import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
