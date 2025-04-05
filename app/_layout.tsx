import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Linking } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebaseConfig"; // Import Firebase auth
import { useColorScheme } from "@/hooks/useColorScheme";

// Import your screens
import HomeScreen from "./(tabs)/home"; // Replace with actual screen imports
import ProfileScreen from "./(hamburger)/userProfile"; // Replace with actual screen imports
import SettingsScreen from "./(hamburger)/cart"; // Replace with actual screen imports
import EducationScreen from "./(tabs)/education"; // Replace with actual screen imports
import ProductsScreen from "./(tabs)/products"; // Replace with actual screen imports
import CartScreen from "./(hamburger)/cart"; // Replace with actual screen imports

// Social links for footer
const socialLinks = [
  { id: 'facebook', name: 'facebook', url: 'https://facebook.com/fivetreesnz', color: '#1877F2' },
  { id: 'instagram', name: 'instagram', url: 'https://instagram.com/fivetreesnz', color: '#E4405F' },
  { id: 'twitter', name: 'twitter', url: 'https://twitter.com/fivetreesnz', color: '#1DA1F2' },
];

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);

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

  if (!loaded || isLoading) {
    return null; // Show nothing until fonts and auth are loaded
  }

  // Bottom Tab Navigator
  function BottomTabs() {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* Drawer Navigator */}
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Cart" component={CartScreen} />

        </Drawer.Navigator>

        {/* Footer with Social Links */}
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
