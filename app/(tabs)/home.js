import React from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { MotiView } from 'moti';
import { FontAwesome } from '@expo/vector-icons';
import Header from '@/components/Header';
import { useEffect } from 'react';


const { width } = Dimensions.get('window');

const specials = [
    { id: '1', title: '50% Off Hand Wash', image: 'https://example.com/special1.jpg' },
    { id: '2', title: 'Buy 1 Get 1 Free', image: 'https://example.com/special2.jpg' },
    { id: '3', title: 'Limited Time Discount', image: 'https://example.com/special3.jpg' },
];


const HomePage = () => {
    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't open URL", err));
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
            {/* 🏠 Header */}
            <Header />

            {/* 🏠 Animated Banner Section */}
            <MotiView
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', duration: 800 }}
                style={{
                    width: '100%',
                    height: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#4CAF50',
                }}
            >
                <Image
                    source={{ uri: 'https://example.com/banner.jpg' }} // Replace with actual image
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    resizeMode="cover"
                />
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                    Welcome to Five Treesaaaaaaaa!
                </Text>
            </MotiView>

            {/* 🔥 Specials Section */}
            <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 20 }}>🔥 Specials</Text>
            <FlatList
                data={specials}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <MotiView
                        from={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', delay: index * 100 }}
                        style={{
                            backgroundColor: '#fff',
                            padding: 15,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                        }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: width * 0.6, height: 150, borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{item.title}</Text>
                    </MotiView>
                )}
            />

        </View>
    );
};

export default HomePage;
