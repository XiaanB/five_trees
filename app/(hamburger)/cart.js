import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useCartStore } from '../../src/store/cartStore'; 

export default function CartPage() {
    const navigation = useNavigation();
    const cartItems = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity); // Assuming you have a function to update quantity in the store

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);

    const handleCheckout = () => {
        console.log('Proceeding to checkout...');
        navigation.navigate('checkOut');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Your Cart</Text>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyCart}>Your cart is empty.</Text>
            ) : (
                cartItems.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>

                            {/* Quantity controls */}
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity 
                                    onPress={() => updateQuantity(item.id, item.quantity - 1)} 
                                    style={styles.quantityButton}
                                    disabled={item.quantity <= 1} // Disable if quantity is 1
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity 
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)} 
                                    style={styles.quantityButton}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            )}

            {cartItems.length > 0 && (
                <>
                    <Text style={styles.total}>Total: ${total}</Text>
                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    emptyCart: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        color: '#4CAF50',
    },
    removeText: {
        color: '#e53935',
        marginTop: 5,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 10,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
});
