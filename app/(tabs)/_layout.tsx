import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: false,
        }}
      />
      {/* <Tabs.Screen
        name="addProduct"
        options={{
          title: 'Add??',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerShown: false,
        }} */}
      {/* /> */}
      {/* <Tabs.Screen
        name="Home1"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: true,
        }}
      /> */}

      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-basket" size={28} color={color} />,
          headerShown: true,
        }}
      />
       <Tabs.Screen
        name="education"
        options={{
          title: 'Education',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="library.fill" color={color} />,
          headerShown: true,
        }}
      />
    </Tabs>
  );
}