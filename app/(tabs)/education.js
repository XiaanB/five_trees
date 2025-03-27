import { View, Text } from 'react-native';
import Header from '@/components/Header';

export default function MainScreen() {

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {/* Your eDUCATIONAL screen content */}
      <Text>eDUCATIONAL Screen Content</Text>
    </View>
  );
}