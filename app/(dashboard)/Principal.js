import { Button, Pressable, Text, View, StyleSheet } from "react-native";
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
        try{
          const file = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'historial.json');
          if (!file){
            setHistorial();
           
            return
          }
          setHistorial(JSON.parse(file));
        }catch(e){
          setHistorial()
          kilometrosAcumulados = 0
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
  console.log(Math.min(Number(kilometrosAcumulados) / Number(meta) ,1))
  let progreso = Math.min(Number(kilometrosAcumulados) / Number(meta) ,1)
  console.log(historial, kilometrosAcumulados, meta)
  return(
    <View style={style.container}>
      <Text style={style.title}>
        Hola, {data ? data + "!": "desconocido !"}
      </Text>
      { meta>0 ? 
      <View style={style.progress_container}>
        <Text style={{fontSize:25, fontWeight:"bold"}}>
          🏁 Tu meta: {meta}KM  
        </Text>
        {metaCumplida && <Text>Meta cumplida !</Text>}
        <Progress.Bar
          progress={progreso}
          color={metaCumplida ? "#00ff0d" : "#00ccff"}
          width={300}
          height={20}
        />
        {kilometrosAcumulados &&
          <Text>{kilometrosAcumulados.toString()} Km  🚶</Text>
        }
      </View>
        :
        <Text>
          No tienes ninguna meta, quieres ingresar uno?
        </Text>
      }
      <Button onPress={()=>navigation.navigate("RegistrarEntrenamieno")} title="Registrar Entrenamiento"/>
      <Button onPress={()=>navigation.navigate("FrasesMotivadoras")} title="Ver Frases Motivadoras"/>
      <Button onPress={()=>navigation.navigate("VerHistorial")} title="Ver Historial"/>
      <Button onPress={()=>navigation.navigate("VerMetas")} title="Ingresar meta"/>
    </View>
  )
}
const style = StyleSheet.create({
  container:{
    flex:1,
    gap:12,
    padding:12
  },
  title:{
    fontSize:40,
    fontWeight:"bold",
    marginTop:30,
    padding:4,
    borderRadius:16,
    textAlign: "center",
    borderWidth:2,
    borderColor:"#008791",
    color:"#008f99"
  },
  progress_container:{
    justifyContent: "center",
    alignItems:"center",
    gap:12,
    borderColor:"#000000",
    borderWidth:2,
    paddingBlock:20,
    borderRadius:16
  }
})