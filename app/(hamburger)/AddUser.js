import { Button, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

const AddUser = () => {
    const [userName, setUsername] = useState('') // State to manage the username input
    const [userAddress, setUserAddress] = useState('') // State to manage the email input
  return (
    <View>
          <TextInput
                placeholder="Enter your details"
                value={userName}
                onChangeText={setUsername} // Assuming you're using useState for managing 'username'
                style={{borderBottomWidth: 1, marginBottom: 10}} // Style for the input field
          />
          <TextInput
                placeholder="Enter your address"
                value={userAddress}
                onChangeText={setUserAddress} // Assuming you're using useState for managing 'username'
                style={{borderBottomWidth: 1, marginBottom: 10}} // Style for the input field
          />
          
        <Button title="Add User" onPress={() => {}} /> {/* Button to trigger the add user action */}
          
    </View>
  )
}

export default AddUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})