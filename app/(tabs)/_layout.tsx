import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { DrawerActions } from '@react-navigation/native'; // Import DrawerActions
import { Stack } from "expo-router";
import { IconSymbol } from '@/components/ui/IconSymbol';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabsLayout() {
  const navigation = useNavigation(); // Get access to navigation
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} // Use DrawerActions to open drawer
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: "Education",
          tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
