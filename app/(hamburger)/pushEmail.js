import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Register for push notifications
async function registerForPushNotificationAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', token);
    } else {
        alert('Must use a physical device for push notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

// Send Push & Email Notification via Courier
async function sendCourierNotification(userEmail, expoPushToken) {
    const COURIER_API_KEY = 'YOUR_COURIER_API_KEY'; // Replace with your actual API key
    const COURIER_URL = 'https://api.courier.com/send';

    const message = {
        message: {
            to: {
                email: userEmail,
                expo: expoPushToken,
            },
            content: {
                title: 'Courier Notification',
                body: 'This is your push and email notification!',
            },
            routing: {
                method: 'all', // Tries push first, then email if push fails
                channels: ['expo', 'email'],
            },
        },
    };

    try {
        const response = await fetch(COURIER_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${COURIER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (!response.ok) {
            throw new Error(`Courier notification failed: ${response.statusText}`);
        }

        console.log('Courier notification sent successfully!');
    } catch (error) {
        console.error('Error sending Courier notification:', error);
    }
}

// Main Screen Component
const PushEmail = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState('');

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View style={{ padding: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Push & Email Notifications</Text>
            <Text>Expo Push Token: {expoPushToken}</Text>

            <View>
                <Text>Notification Title: {notification?.request?.content?.title}</Text>
                <Text>Notification Body: {notification?.request?.content?.body}</Text>
                <Text>Notification Data: {JSON.stringify(notification?.request?.content?.data)}</Text>
            </View>

            <Button
                title="Send Push & Email Notification"
                onPress={async () => {
                    await sendCourierNotification('recipient@example.com', expoPushToken); // Replace with actual recipient email
                }}
            />
        </View>
    );
};

export default PushEmail;
