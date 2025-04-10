import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';

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

import { logOut } from "@/services/auth";


const Drawer = createDrawerNavigator();


// Custom Drawer Content
function CustomDrawerContent(props) {
  const router = useRouter();
       const navigation = useNavigation();

  const handleLogout = async () => {
    console.log("Attempting to log out...");
    const result = await logOut();
    if (result.success) {
      console.log("Logged out successfully");
      navigation.navigate('index'); // Navigate to login screen after logout
    } else {
      console.error("Logout failed", result.error);
    }
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

      <DrawerItem label="Sign Out" onPress={handleLogout} />
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
