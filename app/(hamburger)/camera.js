import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
    async function takeImageHandler() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera is required!');
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
        });
        console.log(image);
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}></View>
            <Button title='Take a picture' onPress={takeImageHandler} />
            <Text style={{ marginTop: 10 }}>Camera Screen</Text>
        </View>
    );
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
    },
    preview: {
        width: '100%',
        height: 250,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    }
});
