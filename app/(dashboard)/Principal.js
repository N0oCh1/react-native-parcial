import { Button, Pressable, Text, View } from "react-native";
import ButtonCompoente from "../../components/ComponentB";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system"
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";

export default function PrincipalComponent ({navigation}) {
  const [data, setData] = useState("");
  const [meta,setMeta] = useState();
  const [historial, setHistorial] = useState();
  const [kilometro, setKilometro] = useState();
  let kilometrosAcumulados = 0;
  let metaCumplida = false;

  useFocusEffect(
    React.useCallback(()=>{
      const getData = async () => {
        const value = await AsyncStorage.getItem('userName');
        setMeta(await AsyncStorage.getItem('meta'));
        setData(value);
      };
      const getHistorialMeta = async() => {
        kilometrosAcumulados = 0
        try{
          const file = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'historial.json');
          if (!file){
            setHistorial();
           
            return
          }
          setHistorial(JSON.parse(file));
        }catch(e){
          console.log(e)
        }
      }
      getData(); 
      getHistorialMeta();
    },[])
  )

  historial?.map(item => 
    kilometrosAcumulados += Number.parseInt(item.distancia)
  )
  if(kilometrosAcumulados>=meta) {
    metaCumplida = true
  }

  console.log(historial,kilometrosAcumulados)
  return(
    <View>
      <Text>
        Hola, {data ? data + "!": "desconocido !"}
      </Text>
      <Progress.Bar
        progress={(meta / kilometrosAcumulados)*100} 
        width={200}
      />
      {meta && 
        <Text>
          Metas: {meta}KM  {metaCumplida && <Text>Meta cumplida</Text>}
        </Text>
      }
      {
        historial && 
        <Text>
          Kilometros acumulados : {kilometrosAcumulados}
        </Text>
      }
     
      <Button onPress={()=>navigation.navigate("RegistrarEntrenamieno")} title="Registrar Entrenamiento"/>
      <Button onPress={()=>navigation.navigate("FrasesMotivadoras")} title="Ver Frases Motivadoras"/>
      <Button onPress={()=>navigation.navigate("VerHistorial")} title="Ver Historial"/>
      <Button onPress={()=>navigation.navigate("VerMetas")} title="Ingresar meta"/>
    </View>
  )
}