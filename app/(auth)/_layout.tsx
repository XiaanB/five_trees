// app/(auth)/_layout.tsx
import React, { useState, useEffect } from 'react';
import { Slot, Link, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

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
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      {/* Optional static message */}
      <View style={{ padding: 20 }}>
        <Text>Please Log In</Text>
        <Link href="/(auth)/login">Go to Login</Link>
      </View>

      {/* 🔥 This renders the login.js screen or any other screen inside (auth) */}
      <Slot />
    </View>
  );
}

