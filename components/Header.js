import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text, Button } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
          <TouchableOpacity onPress={openModal}>
            <MaterialIcons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <Image source={require('../assets/images/fiveTreesIcon.png')} style={styles.fiveTreesIcon} />
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => router.push('/(hamburger)/userProfile')}> 
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(hamburger)/cart')} style={{ marginLeft: 10 }}>
            <MaterialIcons name="shopping-cart" size={30} color="black" />
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
    padding: 10,
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
});

export default Header;