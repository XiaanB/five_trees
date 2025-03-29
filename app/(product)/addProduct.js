import { useState, useRef } from "react";
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
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
    length: "",
    volume: "",
    ingredients: "",
    howItWorks: "",
  });

  const refs = {
    name: useRef(),
    description: useRef(),
    price: useRef(),
    weight: useRef(),
    height: useRef(),
    width: useRef(),
    alength: useRef(),
    volume: useRef(),
    ingredients: useRef(),
    howItWorks: useRef(),
  };

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

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
        volume: parseFloat(product.volume),
        length: parseFloat(product.length),
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
        volume: "",
        length: "",
        ingredients: "",
        howItWorks: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Add New Product</Text>

        <TextInput
          style={styles.input}
          placeholder="SKU"
          value={product.sku}
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) => handleChange("sku", text)}
          onSubmitEditing={() => refs.name.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.name}
          style={styles.input}
          placeholder="Name"
          value={product.name}
          autoCapitalize="words"
          returnKeyType="next"
          autoCorrect={true}
          onChangeText={(text) => handleChange("name", text)}
          onSubmitEditing={() => refs.description.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.description}
          style={styles.input}
          placeholder="Description"
          value={product.description}
          autoCapitalize="sentences"
          returnKeyType="next"
          autoCorrect={true}
          onChangeText={(text) => handleChange("description", text)}
          onSubmitEditing={() => refs.price.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.price}
          style={styles.input}
          placeholder="Price"
          value={product.price}
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(text) => handleChange("price", text)}
          onSubmitEditing={() => refs.weight.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.weight}
          style={styles.input}
          placeholder="Weight"
          value={product.weight}
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(text) => handleChange("weight", text)}
          onSubmitEditing={() => refs.height.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.height}
          style={styles.input}
          placeholder="Height"
          value={product.height}
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(text) => handleChange("height", text)}
          onSubmitEditing={() => refs.width.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.width}
          style={styles.input}
          placeholder="Width"
          value={product.width}
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(text) => handleChange("width", text)}
          onSubmitEditing={() => refs.volume.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.volume}
          style={styles.input}
          placeholder="Volume"
          value={product.volume}
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(text) => handleChange("volume", text)}
          onSubmitEditing={() => refs.length.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.length}
          style={styles.input}
          placeholder="Length"
          value={product.length}
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(text) => handleChange("length", text)}
          onSubmitEditing={() => refs.ingredients.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.ingredients}
          style={styles.input}
          placeholder="Ingredients"
          value={product.ingredients}
          autoCapitalize="sentences"
          returnKeyType="next"
          autoCorrect={true}
          onChangeText={(text) => handleChange("ingredients", text)}
          onSubmitEditing={() => refs.howItWorks.current.focus()}
          blurOnSubmit={false}
        />

        <TextInput
          ref={refs.howItWorks}
          style={styles.input}
          placeholder="How It Works"
          value={product.howItWorks}
          autoCapitalize="sentences"
          returnKeyType="done"
          autoCorrect={true}
          onChangeText={(text) => handleChange("howItWorks", text)}
        />

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        </TouchableOpacity>

        {product.image ? <Image source={{ uri: product.image }} style={styles.imagePreview} /> : null}

        <Button title="Add Product" onPress={addProductToFirestore} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
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
