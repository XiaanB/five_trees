import { useState, useRef } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddProduct = () => {
  const [product, setProduct] = useState({
    sku: "",
    image: "",
    name: "",
    description: "",
    price: "",
    weight: "",
    height: "",
    width: "",
    volume: ""
  });

  // References to input fields for tab navigation
  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const widthRef = useRef();
  const volumeRef = useRef();

  // Handle input changes
  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProduct({ ...product, image: result.assets[0].uri });
    }
  };

  // Function to add product to Firestore
  const addProductToFirestore = async () => {
    if (!product.sku || !product.name || !product.price) {
      Alert.alert("Error", "SKU, Name, and Price are required!");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price),
        weight: parseFloat(product.weight),
        height: parseFloat(product.height),
        width: parseFloat(product.width),
        volume: parseFloat(product.volume)
      });

      Alert.alert("Success", "Product added successfully!");
      setProduct({
        sku: "",
        image: "",
        name: "",
        description: "",
        price: "",
        weight: "",
        height: "",
        width: "",
        volume: ""
      }); // Reset form after success
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="SKU"
        value={product.sku}
        autoCapitalize="none"
        textContentType="none"
        returnKeyType="next"
        onChangeText={(text) => handleChange("sku", text)}
        onSubmitEditing={() => nameRef.current.focus()}
      />

      <TextInput
        ref={nameRef}
        style={styles.input}
        placeholder="Name"
        value={product.name}
        autoCapitalize="words"
        textContentType="name"
        returnKeyType="next"
        onChangeText={(text) => handleChange("name", text)}
        onSubmitEditing={() => descRef.current.focus()}
      />

      <TextInput
        ref={descRef}
        style={styles.input}
        placeholder="Description"
        value={product.description}
        autoCapitalize="sentences"
        textContentType="none"
        returnKeyType="next"
        onChangeText={(text) => handleChange("description", text)}
        onSubmitEditing={() => priceRef.current.focus()}
      />

      <TextInput
        ref={priceRef}
        style={styles.input}
        placeholder="Price"
        value={product.price}
        keyboardType="numeric"
        textContentType="none"
        returnKeyType="next"
        onChangeText={(text) => handleChange("price", text)}
        onSubmitEditing={() => weightRef.current.focus()}
      />

      <TextInput
        ref={weightRef}
        style={styles.input}
        placeholder="Weight"
        value={product.weight}
        keyboardType="numeric"
        returnKeyType="next"
        onChangeText={(text) => handleChange("weight", text)}
        onSubmitEditing={() => heightRef.current.focus()}
      />

      <TextInput
        ref={heightRef}
        style={styles.input}
        placeholder="Height"
        value={product.height}
        keyboardType="numeric"
        returnKeyType="next"
        onChangeText={(text) => handleChange("height", text)}
        onSubmitEditing={() => widthRef.current.focus()}
      />

      <TextInput
        ref={widthRef}
        style={styles.input}
        placeholder="Width"
        value={product.width}
        keyboardType="numeric"
        returnKeyType="next"
        onChangeText={(text) => handleChange("width", text)}
        onSubmitEditing={() => volumeRef.current.focus()}
      />

      <TextInput
        ref={volumeRef}
        style={styles.input}
        placeholder="Volume"
        value={product.volume}
        keyboardType="numeric"
        returnKeyType="done"
        onChangeText={(text) => handleChange("volume", text)}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>

      {product.image ? <Image source={{ uri: product.image }} style={styles.imagePreview} /> : null}

      <Button title="Add Product" onPress={addProductToFirestore} />
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePicker: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});