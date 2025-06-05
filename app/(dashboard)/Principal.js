import { Button, Pressable, Text, View } from "react-native";
import ButtonCompoente from "../../components/ComponentB";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrincipalComponent ({navigation}) {
  const [data, setData] = useState("")
  const [meta,setMeta] = useState()
    
  useEffect(()=>{
      const getData = async () => {
        const value = await AsyncStorage.getItem('userName')
        setMeta(await AsyncStorage.getItem('meta'))
        setData(value);
      };
    getData(); 
  },[data, meta])

  return(
    <View>
      <Text>
        Hola, {data ? data + "!": "desconocido !"}
      </Text>
      {meta && 
        <Text>
          Metas: {meta}
        </Text>
      }
     
      <Button onPress={()=>navigation.navigate("RegistrarEntrenamieno")} title="Registrar Entrenamiento"/>
      <Button onPress={()=>navigation.navigate("FrasesMotivadoras")} title="Ver Frases Motivadoras"/>
      <Button onPress={()=>navigation.navigate("VerHistorial")} title="Ver Historial"/>
      <Button onPress={()=>navigation.navigate("VerMetas")} title="Ingresar meta"/>
    </View>
  )
}