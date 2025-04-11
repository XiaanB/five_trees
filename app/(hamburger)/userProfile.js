import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // If using Expo
import { Switch } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { navigate } from 'expo-router/build/global-state/routing';
import { DatabaseConnection } from '../../Database/Database'; // Adjust the import based on your project structure
import AddUser from '../(hamburger)/AddUser';
import ViewUser from '../(hamburger)/scr/ViewUser';
import DeleteUser from '../(hamburger)/scr/DeleteUser';
import UpdateUser from '../(hamburger)/scr/UpdateUser';
import { useRouter } from 'expo-router';


// const db = DatabaseConnection.getConnection(); // Initialize the database connection
export default function UserProfile() {
    const router = useRouter();

    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [promotions, setPromotions] = useState(false);
    const [subscriptionOrders, setSubscriptionOrders] = useState(false);


    // Function to pick image from gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.cancelled) {
            setPhoto(result.uri);
        }
    };

  

    const handleSave = () => {
        // Handle save logic (e.g., API call to save the profile data)
        console.log('Profile Saved', { name, address, email, phone, newsletter, promotions, subscriptionOrders, photo });
    };

  // useEffect(() => {
  //   // Create the database and table if they don't exist
  //   db.transaction(function(tx){
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY  KEY AUTOINCREMENT, USER_NAME varchar(20), USER_ADDRESS varchar(50), USER_EMAIL varchar(50), USER_PHONE varchar(255))',  
  //       [],
  //       (tx, results) => {
  //         console.log('Table created successfully');
  //       }
  //     )
  //   })
  // }, []);

return (
      <ScrollView contentContainerStyle={styles.container}>
        
        <Button title="Add user" onPress={() => router.push('/AddUser')} />
        <Button title="View user" onPress={() =>navigate.navigate("View")} />
        <Button title="Delete user" onPress={() =>navigate.navigate("Delete")} />
        <Button title="Update user" onPress={() =>navigate.navigate("Update")} />

            <Text style={styles.title}>User Profile</Text>


            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imageContainer}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.profileImage} />
                    ) : (
                        <Text style={styles.uploadText}>Upload Photo</Text>
                    )}
                </View>
            </TouchableOpacity>


            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />


            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />


            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />


            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />


            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Opt-in for Newsletter</Text>
                <Switch
                    value={newsletter}
                    onValueChange={setNewsletter}
                />
            </View>


            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Opt-in for Promotional Materials</Text>
                <Switch
                    value={promotions}
                    onValueChange={setPromotions}
                />
            </View>


            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Opt-in for Subscription Orders</Text>
                <Switch
                    value={subscriptionOrders}
                    onValueChange={setSubscriptionOrders}
                />
            </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    imageContainer: {
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    uploadText: {
        fontSize: 16,
        color: '#888',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
  },
    switchContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},


});


