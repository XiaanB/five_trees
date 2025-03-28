import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetails() {
    const product = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            {/* Product Image */}
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            {/* Product Description */}
            {/* Product Details */}
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>Price: ${product.price}</Text>
            <Text>Weight: {product.weight}g</Text>
            <Text>Height: {product.height}cm</Text>
            <Text>Width: {product.width}cm</Text>
            <Text>Volume: {product.volume}ml</Text>
        </ScrollView>
    );
}

// ✅ Styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    productImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

