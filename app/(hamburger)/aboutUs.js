import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const AboutUsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://example.com/your-logo.png' }} // Replace with your actual logo
          style={styles.logo}
        />
        <Text style={styles.headerText}>About Five Trees</Text>
      </View>

      {/* Company Description Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          At Five Trees, our mission is to provide sustainable and eco-friendly solutions that help make the world a cleaner, greener place. We specialize in reusable hand wash tablets that reduce plastic waste and encourage mindful consumption. Our commitment to quality and environmental responsibility drives us to create innovative products that benefit both our customers and the planet.
        </Text>
      </View>

      {/* Team Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Meet The Team</Text>
        <Text style={styles.sectionText}>
          We are a passionate team of individuals dedicated to making a positive impact on the environment. Our team includes product designers, sustainability experts, and customer service professionals who work together to deliver high-quality products with a personal touch.
        </Text>
      </View>

      {/* Contact Us Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          We would love to hear from you! For inquiries, support, or feedback, feel free to reach out to us.
        </Text>
        <TouchableOpacity onPress={() => router.push('/(hamburger)/contactUs')}>
          <Text style={styles.contactLink}>Go to Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Five Trees Ltd. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  contactLink: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
  },
});

export default AboutUsScreen;
