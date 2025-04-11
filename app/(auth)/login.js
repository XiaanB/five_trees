import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-native";
import * as AuthSession from 'expo-auth-session';




const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  


  // WebBrowser.maybeCompleteAuthSession();

// In your sign-in function, dynamically create the correct redirect URI
  const redirectUri = makeRedirectUri({ useProxy: true });
  console.log("Redirect URI:", redirectUri); // Check the output in the console


  const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",  // Use Web Client ID for Expo
      iosClientId: "582444083351-o690...",   // iOS Client ID
      androidClientId: "582444083351-ccga...", // Android Client ID
      webClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",   // Use the same Web Client ID for Web
      redirectUri,
    });



    // Handle Google Sign-In response
  useEffect(() => {

    if (response?.type === "success") {
      const { id_token } = response.params; // Get the id_token from Google
      const credential = GoogleAuthProvider.credential(id_token); // Create Firebase credential

      signInWithCredential(auth, credential) // Sign in with the credential
        .then(() => {
          Alert.alert("Success", "You are signed in with Google!");
          router.replace("/(tabs)"); // Redirect to the home page
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", error);

          Alert.alert("Error", "Google Sign-In failed!");
        });
    }
  }, [response]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user || null);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          router.replace("/(tabs)/home");
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          setErrorMessage("Google authentication failed.");
        });
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Login Error:", error.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      router.push("/(tabs)/home");
    } catch (error) {
      setErrorMessage("Error signing in as guest");
      console.error("Anonymous Login Error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    promptAsync({ useProxy: true });
    console.log("Redirect URI:", AuthSession.makeRedirectUri({ useProxy: true }));

  };
  
  const handlePasswordReset = async () => {
  if (!email) {
    Alert.alert("Please enter your email address first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Password Reset", "Check your email to reset your password.");
  } catch (error) {
    console.error("Reset error:", error.message);
    Alert.alert("Error", error.message);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Text style={styles.backArrow}>← Back</Text>
    </TouchableOpacity>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

          <TouchableOpacity
            style={[
              styles.primaryButton,
              isAdmin && { backgroundColor: "#28a745" },
            ]}
            onPress={handleLogin}
          >
        <Text style={styles.primaryButtonText}>
            {isAdmin ? "Login as Admin" : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePasswordReset} style={{ marginTop: 10 }}>
        <Text style={{ color: "#007bff", textAlign: "center" }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>


        <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsAdmin(!isAdmin)}
        >
        <Text style={styles.switchButtonText}>
            {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
        </Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
        <Text style={styles.guestButtonText}>Continue as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {user && (
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text>Welcome, {user.displayName || "User"}!</Text>
          <Button title="Logout" onPress={() => auth.signOut()} />
        </View>
      )}
      
    </View>
  );
  
};

export const unstable_settings = {
  initialRouteName: 'login',
};

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  backArrow: {
    fontSize: 18,
    color: "#007AFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  guestButton: {
    backgroundColor: "#555",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  guestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
    button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  link: {
    marginTop: 24,
    textAlign: "center",
    color: "#007AFF",
    fontSize: 15,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  switchButton: {
    marginTop: 16,
    alignItems: "center",
  },
  switchButtonText: {
    color: "#007AFF",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});


export default LoginScreen;
