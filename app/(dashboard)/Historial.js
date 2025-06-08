import {View, Text, ScrollView, StyleSheet, Pressable, useColorScheme, Appearance} from "react-native"
import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"

const path = FileSystem.documentDirectory+'historial.json'
export default function HistorialComponente ({navigation}) {

  const [data, setData] = useState();

  useEffect (()=>{
    async function obtenerDatos() {
      try{
        setData(JSON.parse(await FileSystem.readAsStringAsync(path)))
      }catch(e){
        console.log(e)
      }
    }
    obtenerDatos()
  },[])
  console.log(data)
  function BorrarHistorial () {
    FileSystem.deleteAsync(path).then(()=>setData([])).catch(e=>console.log(e))
    navigation.replace("VerHistorial")
  }

  return (
    <View style={style.container}>
      {data  ?
      <ScrollView >
        <View style={{gap:12, alignItems:"center"}}>
        {data.map((item,i) => {
          return(
            <View style={{}} key={i}>
              <Text style={{fontSize:15, marginBottom:"10"}}>
                Entrenamiento de: {item.fecha}
              </Text>
              <Text style={{fontSize:15}}>
                {`Distancia => ${item.distancia}Km`}
              </Text >
              <Text style={{fontSize:15, marginBottom:10}}>
                {`Tiempo => ${item.tiempo} Minutos`}
              </Text>
            </View>
          )
        })}
          <Pressable style={style.btn_guardar} onPress={()=>BorrarHistorial()}>
            <Text style={{fontSize:16 , color: "#ffffff"}}>
              Borrar Historial
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      :
      <View style={style.container_fallback}>
        <Text style={style.text_fallback}>
          No tienes historial registrado
        </Text>
        <Text style={{fontSize:45}}>
          🗒️
        </Text>
      </View>
      
      }
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    padding:20,
    flex:1,
    alignItems:"center",
    
  },
    btn_guardar: {

      width:200,
      alignItems:"center",
      paddingBlock:6,
      paddingInline:8,
      backgroundColor:"#ff0000",
      borderColor:"#ff0000",
      borderWidth:4,
      borderRadius:16
    },

    lines: {
      width:"100%",
      height:1,
      backgroundColor:"blue"

    },
    container_fallback:{
      backgroundColor:"#ffffff",
      top:"40%",
      justifyContent:"center",
      alignItems:"center",
      padding:12,
      borderRadius:12
    },
    text_fallback:{
      fontSize:20,
      fontWeight:"bold"
    }
  });