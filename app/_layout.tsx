import { Drawer } from "expo-router/drawer";
import { View, Text,TouchableOpacity, StyleSheet } from "react-native";
import { Stack,useRouter, useSegments } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Linking } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { auth } from "../src/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import CustomSplash from '../components/CustomSplash';


const socialLinks = [
    { id: 'facebook', name: 'facebook', url: 'https://facebook.com/fivetreesnz', color: '#1877F2' },
    { id: 'instagram', name: 'instagram', url: 'https://instagram.com/fivetreesnz', color: '#E4405F' },
    { id: 'twitter', name: 'twitter', url: 'https://twitter.com/fivetreesnz', color: '#1DA1F2' },
];

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000);
  }, []);



  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      setIsGuest(user?.isAnonymous || false);

      if (!user) {
        router.replace("/(auth)/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!appReady || !loaded || isLoading) {
    return <CustomSplash />;
  }



  return (
    
    <View style={{ flex: 1 }}>

      {/* MAIN CONTENT - Drawer Navigation */}
      <View style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
          <Drawer.Screen name="(hamburger)/aboutUs" options={{ title: "About Us" }} />
          <Drawer.Screen name="(hamburger)/contactUs" options={{ title: "Contact Us" }} />
          <Drawer.Screen name="(hamburger)/userProfile" options={{ title: "User Profile" }} />

        </Drawer>
      </View>

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
    </View>
  );
}
