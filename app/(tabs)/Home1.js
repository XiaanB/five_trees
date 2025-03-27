import { View, Text, } from 'react-native';
import Header from '@/components/Header';

export default function MainScreen() {

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {/* Your main screen content */}
      <Text>Main Screen Content</Text>
    </View>
  );
}