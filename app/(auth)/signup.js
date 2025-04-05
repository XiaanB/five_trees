import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useRouter } from "expo-router";
import { signUp } from "../../services/auth";
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';


const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  let db = null;

  if (Platform.OS !== 'web') {
    db = SQLite.openDatabase('userDetails.db');
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    subscribed: false,
    newsletter: false,
    photo: null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  const handleSignup = async () => {
    const result = await signUp(email, password);
    if (result.success) {
      router.replace("/(tabs)/home"); // Redirect to home page after signup
    } else {
      setErrorMessage(result.error);
    }
    // Store in SQLite
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, subscribed INTEGER, newsletter INTEGER, photo TEXT);`
        );
        tx.executeSql(
          `INSERT INTO user (email, firstName, lastName, address, phone, subscribed, newsletter, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            form.email,
            form.firstName,
            form.lastName,
            form.address,
            form.phone,
            form.subscribed ? 1 : 0,
            form.newsletter ? 1 : 0,
            form.photo,
          ]
        );
      });

      alert('User details saved locally!');
    }
  };


return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <Text style={styles.label}>Select Role:</Text>
      <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} style={styles.picker}>
        <Picker.Item label="Customer" value="customer" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <TextInput placeholder="Email" onChangeText={email => setForm({ ...form, email })} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={password => setForm({ ...form, password })} />
      <TextInput placeholder="First Name" onChangeText={firstName => setForm({ ...form, firstName })} />
      <TextInput placeholder="Last Name" onChangeText={lastName => setForm({ ...form, lastName })} />
      <TextInput placeholder="Address" onChangeText={address => setForm({ ...form, address })} />
      <TextInput placeholder="Phone Number" onChangeText={phone => setForm({ ...form, phone })} keyboardType="phone-pad" />
      
      <TouchableOpacity onPress={pickImage}>
        <Text>Select Profile Photo</Text>
      </TouchableOpacity>
      {form.photo && <Image source={{ uri: form.photo }} style={{ width: 100, height: 100 }} />}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text>Subscribe</Text>
        <Switch value={form.subscribed} onValueChange={subscribed => setForm({ ...form, subscribed })} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Newsletter</Text>
        <Switch value={form.newsletter} onValueChange={newsletter => setForm({ ...form, newsletter })} />
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#007bff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default signup;
