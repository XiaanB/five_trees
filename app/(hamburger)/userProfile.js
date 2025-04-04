import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { logOut } from "@/services/auth";
import { auth } from "../../src/firebaseConfig";

const isGuest = auth.currentUser?.isAnonymous;

const UserProfileScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      router.replace("/(auth)/login"); // Redirects to login screen
      console.log("Guest signed out:", userCredential.email);

    } else {
      console.error(result.error);
    }
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {isGuest ? (
        <Text style={{ marginBottom: 20 }}>You are logged in as a guest.</Text>
      ) : (
        <Text style={{ marginBottom: 20 }}>Welcome back!</Text>
      )}
      <Text style={{ marginBottom: 20 }}>User Details:</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserProfileScreen;
