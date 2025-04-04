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
import { View, Text } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { MotiView } from 'moti';
// ✅ Use this:
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Linking } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const socialLinks = [
    { id: 'facebook', name: 'facebook', url: 'https://facebook.com/fivetreesnz', color: '#1877F2' },
    { id: 'instagram', name: 'instagram', url: 'https://instagram.com/fivetreesnz', color: '#E4405F' },
    { id: 'twitter', name: 'twitter', url: 'https://twitter.com/fivetreesnz', color: '#1DA1F2' },
];


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
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="(tabs)" />
            {isGuest ? <Stack.Screen name="guestRestrictedPage" /> : null}
          </>
        ) : (
          <Stack.Screen name="auth/login" />
        )}
      </Stack>

      {/* FOOTER */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
        {socialLinks.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => Linking.openURL(item.url)}
            style={{ marginHorizontal: 10 }}
          >
            <FontAwesome name={item.name} size={20} color={item.color} />
        </TouchableOpacity>

        ))}
      </View>
    </ThemeProvider>
  </GestureHandlerRootView>
);
}