import React, { useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { FontAwesome } from '@expo/vector-icons';
import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import myVideo from '@/assets/videos/Banner.mp4';
import bannerImage from '@/assets/images/Banner.jpg'; // Adjust the path to your video
import special1 from '@/assets/images/special1.jpg'; // Adjust the path to your video
import special2 from '@/assets/images/special2.jpg'; // Adjust the path to your video
import special3 from '@/assets/images/special3.jpg'; // Adjust the path to your video



// Import local images correctly
// const bannerImage = require('../../assets/images/banner.jpg');
// const special1 = require('../../../assets/images/special1.jpg');
// const special2 = require('../../../assets/images/special2.jpg');
// const special3 = require('../../../assets/images/special3.jpg');

const { width } = Dimensions.get('window');

const specials = [
    { id: '1', title: '50% Off Hand Wash', image: special1 },
    { id: '2', title: 'Buy 1 Get 1 Free', image: special2 },
    { id: '3', title: 'Limited Time Discount', image: special3 },
];

const HomePage = () => {
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

    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't open URL", err));
    };

    return (
         
        <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }} contentContainerStyle={{ paddingBottom: 40 }}>
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
                    source={bannerImage}
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    resizeMode="cover"
                />
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                    Welcome to Five Trees
                </Text>
            </MotiView>

            {/* 📹 Video Section */}
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
                            source={item.image}
                            style={{ width: width * 0.6, height: 150, borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{item.title}</Text>
                    </MotiView>
                )}
            />
        </ScrollView>
    );
};

export default HomePage;
