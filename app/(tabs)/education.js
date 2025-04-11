import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import myVideo from '@/assets/videos/Banner.mp4'





const Educational = () => {
    const navigation = useNavigation();

useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
                <FontAwesome name="bars" size={24} color="black" />
            </TouchableOpacity>
        ),
        headerTitle: 'Home',
        headerShown: true,
    });
}, [navigation]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 20 }}>
        {/* 🌱 Section 1: Introduction */}
            <Header />
            
        
            <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', duration: 800 }}
                style={{ marginBottom: 20 }}
            >
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#4CAF50' }}>
                    Why Choose Eco-Friendly Hand Wash?
                </Text>
                <Text style={{ fontSize: 16, marginTop: 10, textAlign: 'center' }}>
                    Traditional liquid soaps come in plastic bottles that contribute to environmental waste.  
                    Five Trees' hand wash tablets offer a **sustainable**, **waste-free**, and **natural** way  
                    to keep your hands clean.
                </Text>
            </MotiView>

            {/* 🧴 Section 2: How It Works */}
            <MotiView
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 800, delay: 200 }}
                style={{ padding: 15, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, marginBottom: 20 }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>How It Works</Text>
                                <MotiView
                                    from={{ opacity: 0, translateY: 30 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'timing', duration: 800 }}
                                    >
                                    <Video
                                          source={myVideo}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="cover"
                                        shouldPlay
                                        isLooping
                                        useNativeControls
                                        style={{
                                        width: width - 40,
                                        height: 200,
                                        borderRadius: 10,
                                        marginHorizontal: 20,
                                        marginVertical: 20,
                                        }}
                                    />
                                    </MotiView>
                
                <Text style={{ fontSize: 16, marginTop: 10 }}>
                    1️⃣ Fill a reusable soap dispenser with warm water.{"\n"}
                    2️⃣ Drop in one Five Trees hand wash tablet.{"\n"}
                    3️⃣ Let it dissolve and start using your new hand wash!
                </Text>
            </MotiView>

            {/* ✅ Section 3: Benefits */}
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', duration: 800, delay: 400 }}
                style={{ marginBottom: 20 }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Benefits of Five Trees Hand Wash</Text>
                <Text style={{ fontSize: 16 }}>✅ Zero Plastic Waste</Text>
                <Text style={{ fontSize: 16 }}>✅ Natural Ingredients</Text>
                <Text style={{ fontSize: 16 }}>✅ Vegan & Cruelty-Free</Text>
                <Text style={{ fontSize: 16 }}>✅ Cost-Effective & Long-Lasting</Text>
            </MotiView>

            {/* ❓ Section 4: FAQs */}
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 800, delay: 600 }}
                style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3 }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>FAQs</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🤔 Do these tablets work with any dispenser?</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Yes! They dissolve easily in any standard soap dispenser.</Text>

                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🤔 Are they safe for sensitive skin?</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Absolutely! Our formula is free from harsh chemicals.</Text>

                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🤔 How long does one tablet last?</Text>
                <Text style={{ fontSize: 16 }}>One tablet makes 250ml of liquid soap, which lasts as long as a regular bottle.</Text>
            </MotiView>
        </ScrollView>
    );
};

export default Educational;
