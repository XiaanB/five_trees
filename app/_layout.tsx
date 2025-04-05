import { Drawer } from "expo-router/drawer";
import { View, Text } from "react-native";
import { globalStyles } from "./styles"; // Import styles
import { Stack } from "expo-router";


export default function Layout() {
  return (
    
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={{ backgroundColor: "#6200ea", padding: 20 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          My App Header
        </Text>
      </View>

      {/* MAIN CONTENT - Drawer Navigation */}
      <View style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
          <Drawer.Screen name="(drawer)/about" options={{ title: "About Us" }} />
          <Drawer.Screen name="(drawer)/contact" options={{ title: "Contact Us" }} />
        </Drawer>
      </View>

      {/* FOOTER */}
      <View style={{ backgroundColor: "#6200ea", padding: 15 }}>
        <Text style={{ color: "white", textAlign: "center" }}>My App Footer</Text>
      </View>
    </View>
  );
}
