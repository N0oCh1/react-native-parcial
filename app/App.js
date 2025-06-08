import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeComponent from './Home';
import PrincipalComponent from './(dashboard)/Principal';
import RegistrarComponente from './(dashboard)/RegistrarEntrenamiento';
import HistorialComponente from './(dashboard)/Historial';
import MetasComponentes from './(dashboard)/Metas';
import FrasesComponente from './(dashboard)/FrasesMotivadoras';



const Stak = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stak.Navigator>
        <Stak.Screen
        name='Home'
        options={{title:"", headerShown:false}}
        component={HomeComponent}
        />
        <Stak.Screen
        name='principal'
        options={{title:"", headerShown:false}}
        component={PrincipalComponent}
        />
        <Stak.Screen
        name='RegistrarEntrenamieno'
        component={RegistrarComponente}
        />
        <Stak.Screen
        name='FrasesMotivadoras'
        options={{title:"Frases Motivadoras"}}
        component={FrasesComponente}
        />
        <Stak.Screen
        name='VerHistorial'
        options={{title:"Historial"}}
        component={HistorialComponente}
        />
        <Stak.Screen
        name='VerMetas'
        options={{title:"Ingresar Metas"}}
        component={MetasComponentes}
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
 