import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { auth } from "../app/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      setIsGuest(user?.isAnonymous || false);

      if (!user) {
        router.replace("/auth/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || isLoading) {
    return null; // Show nothing until fonts and auth are loaded
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="(tabs)" /> // Show main app if logged in
            {isGuest ? <Stack.Screen name="guestRestrictedPage" /> : null}
          </>
        ) : (
          <Stack.Screen name="auth/login" /> // Show login screen if not logged in
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
