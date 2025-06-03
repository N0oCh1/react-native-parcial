import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeComponent from './Home';



const Stak = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stak.Navigator>
        <Stak.Screen
        name='Home'
        component={HomeComponent}
        />
      </Stak.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
