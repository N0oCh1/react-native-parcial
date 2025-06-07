import { useState } from "react"
import {View, Text, TextInput, Button,StyleSheet} from "react-native"
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default function MetasComponentes({navigation}) {
  const [texto, setTexto] = useState(0);
  
  async function GuardarMetas() {
    navigation.replace('principal')
    try{
      await AsyncStorage.setItem('meta',texto)
      alert('metas estalbecido')
    }catch(e){
      return
    }
    
  }
  
  return(
    <View style={style.container}>
      <Text>
        Hola este esta son las metas 
      </Text>
      <TextInput
      keyboardType="numeric"
      onChangeText={setTexto}
      />
      <Button title="Guardar metas" onPress={async () => await GuardarMetas()}/>
    </View>
  )
}
const style = StyleSheet.create({
  
})