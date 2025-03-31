import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Cart() {
  const router = useRouter();

  // Example cart data, replace this with your actual cart state or data source
  const cartItems = [
    {
      id: '1',
      name: 'Reusable Hand Wash Tablet',
      price: 29.99,
      quantity: 2,
      image: 'https://example.com/product-image.jpg',
    },
    {
      id: '2',
      name: 'Eco-Friendly Soap Dish',
      price: 12.99,
      quantity: 1,
      image: 'https://example.com/product-image2.jpg',
    },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    router.push('/checkout');
  };

  const handleRemoveItem = (itemId) => {
    console.log(`Removing item with id: ${itemId}`);
    // Implement removal logic here (e.g., update state)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* Total Price */}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        </View>
      )}

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  removeButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
