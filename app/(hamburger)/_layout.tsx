import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../src/firebaseConfig";
import { signOut } from "firebase/auth";

// Import screens
import AboutScreen from "../(hamburger)/aboutUs";
import ContactScreen from "../(hamburger)/contactUs";
import CameraScreen from "../(hamburger)/camera";
import CartScreen from "../(hamburger)/cart";
import CheckOutScreen from "../(hamburger)/checkout";
import MapScreen from "../(hamburger)/map";
import PushDemoScreen from "../(hamburger)/pushDemo";
import PushEmailScreen from "../(hamburger)/pushEmail";
import UserProfileScreen from "../(hamburger)/userProfile";
import AddProductScreen from "../(product)/addProduct";

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
      <DrawerItem label="Contact Us" onPress={() => props.navigation.navigate("contact")} />
      <DrawerItem label="Camera" onPress={() => props.navigation.navigate("camera")} />
      <DrawerItem label="Cart" onPress={() => props.navigation.navigate("cart")} />
      <DrawerItem label="Check Out" onPress={() => props.navigation.navigate("checkOut")} />
      <DrawerItem label="Map" onPress={() => props.navigation.navigate("map")} />
      <DrawerItem label="Push Demo" onPress={() => props.navigation.navigate("pushDemo")} />
      <DrawerItem label="Push Email" onPress={() => props.navigation.navigate("pushEmail")} />
      <DrawerItem label="User Profile" onPress={() => props.navigation.navigate("userProfile")} />
      <DrawerItem label="Add Product" onPress={() => props.navigation.navigate("addProduct")} />

      <DrawerItem label="Sign Out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="about" component={AboutScreen} />
          <Drawer.Screen name="contact" component={ContactScreen} />
          <Drawer.Screen name="camera" component={CameraScreen} />
          <Drawer.Screen name="cart" component={CartScreen} />
          <Drawer.Screen name="checkOut" component={CheckOutScreen} />
          <Drawer.Screen name="map" component={MapScreen} />
          <Drawer.Screen name="pushDemo" component={PushDemoScreen} />
          <Drawer.Screen name="pushEmail" component={PushEmailScreen} />
          <Drawer.Screen name="userProfile" component={UserProfileScreen} />
          <Drawer.Screen name="addProduct" component={AddProductScreen} />
          
    </Drawer.Navigator>
  );
}
