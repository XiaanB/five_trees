// app/(auth)/_layout.tsx
import React, { useState, useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking auth
    const userLoggedIn = false; // Simulate not logged in
    setIsAuthenticated(userLoggedIn);
  }, []);

  // If logged in, redirect to the main app
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/home'); // Redirect after authentication
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      {/* This will hide the header for all screens in this layout */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Renders the login screen or any other screen inside (auth) */}
        <Slot />
      </Stack>
    </View>
  );
}
