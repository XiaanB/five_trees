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

WebBrowser.maybeCompleteAuthSession();
const redirectUri = makeRedirectUri({ useProxy: true });

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",
    iosClientId: "582444083351-o690ln6gvvh14sh9m8e5oqe759r2hi1g.apps.googleusercontent.com",
    androidClientId: "582444083351-ccgacqi7168d8efp1ri6hmtl5q1mp9kg.apps.googleusercontent.com",
    webClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

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
  };
  

  return (
    <View style={styles.container}>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  guestButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  guestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007AFF",
    textDecorationLine: "underline",
    },
  switchButton: {
  marginTop: 12,
  alignItems: "center",
},

switchButtonText: {
  color: "#007AFF",
  fontSize: 14,
  textDecorationLine: "underline",
},

});

export default LoginScreen;
