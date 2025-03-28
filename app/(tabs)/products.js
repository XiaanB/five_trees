import React, { useEffect, useState } from 'react';
import { 
    View, Text, Image, FlatList, TouchableOpacity, StyleSheet 
} from 'react-native';
import { useRouter } from "expo-router"; 
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import HeaderProducts from '@/components/HeaderProducts';


export default function Products() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [isGridView, setIsGridView] = useState(false); // Toggle between list/grid

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
      <View style={styles.container}>
        <HeaderProducts />
            {/* Toggle View Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setIsGridView(!isGridView)} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>{isGridView ? "List View" : "Grid View"}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => router.push('/(tabs)/addProduct')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add Product</Text>
                </TouchableOpacity>
                          <TouchableOpacity onPress={() => router.push('/(tabs)/deleteProduct')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Delete Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/modifyProduct')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Modify Product</Text>
                </TouchableOpacity> */}

            </View>

            {/* Product List/Grid */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                key={isGridView ? 'grid' : 'list'} // Forces re-render when view changes
                numColumns={isGridView ? 2 : 1}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => router.push({ pathname: '/(product)/productDetails', params: item })}
                        style={[styles.productCard, isGridView && styles.productCardGrid]}
                    >
                        <Image source={{ uri: item.image }} style={[styles.productImage, isGridView && styles.productImageGrid]} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                            {!isGridView && <Text style={styles.productDescription}>{item.description}</Text>}
                        </View>
                    </TouchableOpacity>
                )}
            />


            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    toggleButton: {
        backgroundColor: "#6c757d",
        padding: 10,
        borderRadius: 5,
    },
    toggleButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    addButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    productCard: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    productCardGrid: {
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        margin: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    productImageGrid: {
        width: 100,
        height: 100,
        marginRight: 0,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    productPrice: {
        fontSize: 14,
        color: "#28a745",
        textAlign: "center",
    },
    productDescription: {
        fontSize: 12,
        color: "#555",
    },
});



