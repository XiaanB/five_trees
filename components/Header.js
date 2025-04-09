import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text, Button } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3); // Example cart count, you can dynamically update this
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.header}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Image source={require('../assets/images/fiveTreesIcon.png')} style={styles.fiveTreesIcon} />
            <Text style={{ marginLeft: 10, fontSize: 10 }}>Home</Text>
          </TouchableOpacity>
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => router.push('/(hamburger)/userProfile')}>
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>

          {/* Cart Icon with Badge */}
          <TouchableOpacity onPress={() => router.push('/(hamburger)/cart')} style={{ marginLeft: 10 }}>
            <View style={styles.cartIconContainer}>
              <MaterialIcons name="shopping-cart" size={30} color="black" />
              {cartItemCount > 0 && (
                <View style={styles.cartItemCount}>
                  <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Navigation</Text>

            <TouchableOpacity
              onPress={() => {
                router.push('/(hamburger)/aboutUs');
                closeModal();
              }}
              style={{ padding: 10 }}
            >
              <Text>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push('/(hamburger)/contactUs');
                closeModal();
              }}
              style={{ padding: 10 }}
            >
              <Text>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push('/(hamburger)/userProfile');
                closeModal();
              }}
              style={{ padding: 10 }}
            >
              <Text>User Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push('/(hamburger)/camera');
                closeModal();
              }}
              style={{ padding: 10 }}
            >
              <Text>Camera</Text>
            </TouchableOpacity>

            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fiveTreesIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartItemCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
