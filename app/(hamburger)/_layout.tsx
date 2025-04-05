// // app/(hamburger)/_layout.tsx
// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { View, Text } from 'react-native';
// import AboutScreen from './aboutUs';        
// import CameraScreen from './camera';      // Import your Camera screen (JS)
// import CartScreen from './cart';          // Import your Cart screen (JS)
// import CheckoutScreen from './checkout';  // Import your Checkout screen (JS)
// import ContactScreen from './contactUs';    // Import your Contact screen (JS)
// import MapScreen from './map';            // Import your Map screen (JS)
// import UserProfileScreen from './userProfile'; // Import your UserProfile screen (JS)
// import AddProductScreen from './addProduct'; // Admin only
// import DeleteProductScreen from './deleteProduct'; // Admin only
// import ModifyProductScreen from './modifyProduct'; // Admin only
// import ProductDetailsScreen from './productDetails'; // Admin only
// import PushDemoScreen from './pushDemo'; // Admin only
// import PushEmailScreen from './pushEmail'; // Admin only

// const Drawer = createDrawerNavigator();

// export default function DrawerLayout() {
//   // Replace with real authentication logic or context for isAdmin
//   const isAdmin = true;  // You should get this from the user context or state

//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="About" component={AboutScreen} />
//       <Drawer.Screen name="Camera" component={CameraScreen} />
//       <Drawer.Screen name="Cart" component={CartScreen} />
//       <Drawer.Screen name="Checkout" component={CheckoutScreen} />
//       <Drawer.Screen name="Contact" component={ContactScreen} />
//       <Drawer.Screen name="Map" component={MapScreen} />
//       <Drawer.Screen name="User Profile" component={UserProfileScreen} />

//       {/* Conditionally render admin screens */}
//       {isAdmin && (
//         <>
//           <Drawer.Screen name="Add Product" component={AddProductScreen} />
//           <Drawer.Screen name="Delete Product" component={DeleteProductScreen} />
//           <Drawer.Screen name="Modify Product" component={ModifyProductScreen} />
//           <Drawer.Screen name="Product Details" component={ProductDetailsScreen} />
//           <Drawer.Screen name="Push Demo" component={PushDemoScreen} />
//           <Drawer.Screen name="Push Email" component={PushEmailScreen} />
//         </>
//       )}
//     </Drawer.Navigator>
//   );
// }