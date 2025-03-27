import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { launchCameraAsync } from 'expo-image-picker';

const CameraScreen = () => {
    const [pickerImage, setPickerImage] = useState();

    async function takeImageHandler() {
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image.assets[0].uri);
            if (!image.canceled) {
                setPickerImage(image.assets[0].uri);
            }
        setPickerImage(image.assets[0].uri);
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 20,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <View style={{
                marginBottom: 20,
                width: '100%',
                alignItems: 'center',   
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,   
                height: 300,
                backgroundColor: 'lightgray',
                }}
            
            >
                <Image
                    source={{ uri: pickerImage }}
                    style={{ width: '100%', height: 300, borderRadius: 10 }}
                    resizeMode="cover"
                    contentFit="cover"
                    alt="picked-image"
                ></Image>

            </View>
        

            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
        
            
    );
}

export default CameraScreen;
