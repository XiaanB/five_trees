import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';

// Stripe integration (use the stripe react-native SDK)
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

export default function Checkout() {
  const router = useRouter();
  
  // Example cart data for review
  const cartItems = [
    {
      id: '1',
      name: 'Reusable Hand Wash Tablet',
      price: 29.99,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Eco-Friendly Soap Dish',
      price: 12.99,
      quantity: 1,
    },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // State for user input (shipping details)
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleProceedToPayPal = () => {
    console.log('Proceeding to PayPal...');
    // Redirect to PayPal integration (API or WebView)
    router.push('/payment-success');
  };

  const handleStripePayment = () => {
    console.log('Proceeding with Stripe payment...');
    // Call Stripe's API to initiate the payment process
    // You would typically set up a backend to create a payment intent here
    router.push('/payment-success');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* Cart Items Review */}
      <View style={styles.reviewContainer}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>
              ${item.price.toFixed(2)} x {item.quantity}
            </Text>
            <Text style={styles.productTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        </View>
      </View>

      {/* Shipping Information */}
      <View style={styles.shippingContainer}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>
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
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* PayPal Button */}
      <TouchableOpacity style={styles.paypalButton} onPress={handleProceedToPayPal}>
        <Text style={styles.paypalText}>Pay with PayPal</Text>
      </TouchableOpacity>

      {/* Stripe Credit/Debit Card Button */}
      <TouchableOpacity style={styles.stripeButton} onPress={handleStripePayment}>
        <Text style={styles.stripeText}>Pay with Credit/Debit Card</Text>
      </TouchableOpacity>

      {/* Proceed to Checkout Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleStripePayment}>
        <Text style={styles.proceedText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  reviewContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cartItem: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetails: {
    fontSize: 16,
    color: '#555',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  totalContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  shippingContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  paypalButton: {
    backgroundColor: '#009CDE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paypalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stripeButton: {
    backgroundColor: '#6772e5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stripeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
