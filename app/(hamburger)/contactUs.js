import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function ContactUsScreen() {
    const router = useRouter(); // Expo Router Hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        alert(`Thank you, ${name}! We'll get back to you soon.`);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 20 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                📩 Contact Us
            </Text>

            {/* 📞 Phone & Email Section */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => Linking.openURL('tel:+64212345678')}>
                    <FontAwesome name="phone" size={30} color="#4CAF50" />
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>Call Us</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('mailto:info@fivetrees.co.nz')}>
                    <MaterialIcons name="email" size={30} color="#4CAF50" />
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>Email Us</Text>
                </TouchableOpacity>
            </View>

            {/* ✉️ Contact Form */}
            <TextInput
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
            />
            <TextInput
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
            />
            <TextInput
                placeholder="Your Message"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    textAlignVertical: 'top',
                }}
            />

            {/* 📨 Send Button */}
            <TouchableOpacity
                onPress={handleSend}
                style={{
                    backgroundColor: '#4CAF50',
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Send Message</Text>
            </TouchableOpacity>

            {/* 🌍 Link to Map Page (Fixed for Expo Router) */}
            <TouchableOpacity
                onPress={() => router.push('/(hamburger)/map')} // ✅ Corrected navigation for Expo Router
                style={{
                    backgroundColor: '#FF9800',
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>📍 View Our Location</Text>
            </TouchableOpacity>
        </View>
    );
}
