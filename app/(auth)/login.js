import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

 

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false); // define state

    // Google Auth Session
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",
        iosClientId: "582444083351-o690ln6gvvh14sh9m8e5oqe759r2hi1g.apps.googleusercontent.com",
        androidClientId: "582444083351-ccgacqi7168d8efp1ri6hmtl5q1mp9kg.apps.googleusercontent.com",
        webClientId: "582444083351-18bib0ib1suegl75vkgc7p95sl1ac8e4.apps.googleusercontent.com",
    });

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
                    router.replace("/(hamburger)/(tabs)/home");
                })
                .catch((error) => {
                    console.error("Authentication error:", error);
                    setErrorMessage("Google authentication failed.");
                });
        }
    }, [response]);

    // Email & Password Sign-In
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
              router.push("/(tabs)/home");
            //   console.log("User signed in:", auth.currentUser.email);
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Login Error:", error.message);
        }
    };

    // Guest Login
    const handleGuestLogin = async () => {
        try {
            await signInAnonymously(auth);
            // Simulate login and admin check
            if (isAdmin) {
            router.push('/(tabs)/education');  // Admin user goes to home
            } else {
            router.push('(tabs)/education');  // Non-admin user goes to home
            }
            // console.log("Guest user signed in:", auth.currentUser);
        } catch (error) {
            setErrorMessage("Error signing in as guest");
            console.error("Anonymous Login Error:", error.message);
        }
    };

    // Google Sign-In
    const handleGoogleSignIn = async () => {
        promptAsync();
    };

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button title="Log In as Admin" onPress={() => { setIsAdmin(true); handleLogin(); }} />
            <Button title="Log In as User" onPress={() => { setIsAdmin(false); handleLogin(); }} />
            <Text style={styles.title}>Login</Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Google Sign-In Button */}
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            {/* Guest Login Button */}
            <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            {/* If User is Signed In */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {user ? (
                    <>
                        <Text>Welcome, {user.displayName || "User"}</Text>
                        <Button title="Logout" onPress={() => auth.signOut()} />
                    </>
                ) : (
                    <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ccc",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    googleButton: {
        backgroundColor: "#DB4437",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    googleButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    guestButton: {
        backgroundColor: "#888",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    guestButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    link: {
        marginTop: 10,
        color: "#007bff",
    },
});

export default LoginScreen;
