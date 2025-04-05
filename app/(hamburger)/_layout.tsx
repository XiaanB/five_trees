import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../src/firebaseConfig";
import { signOut } from "firebase/auth";

// Import screens
import AboutScreen from "../(hamburger)/aboutUs";
import ContactScreen from "../(hamburger)/contactUs";

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.replace("/(auth)/"); // Redirect to sign-in after logout
  };
console.log("Drawer is rendering!"); // Debugging log
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="About" onPress={() => props.navigation.navigate("about")} />
      <DrawerItem label="Contact" onPress={() => props.navigation.navigate("contact")} />
      <DrawerItem label="Sign Out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="about" component={AboutScreen} />
      <Drawer.Screen name="contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
}
