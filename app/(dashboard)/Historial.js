import {View, Text, ScrollView, StyleSheet, Pressable} from "react-native"
import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"

const path = FileSystem.documentDirectory+'historial.json'
export default function HistorialComponente ({navigation}) {
  const [data, setData] = useState([]);

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
      <Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", marginBottom:"20"}}>
        Hola este es historial
      </Text>
      {data && 
      <ScrollView >
        <View style={{gap:12, alignItems:"center"}}>
        {data.map((item,i) => {
          return(
            <View style={{backgroundColor: "#00aae4"}} key={i}>
              <Text style={{fontSize:15, marginBottom:"10"}}>
                {`Entrenamiento de: ${item.fecha}`}
              </Text>
            <View style={style.lines}> </View>
              <Text style={{fontSize:15}}>
                {`Distancia => ${item.distancia}Km`}
              </Text >
              <Text style={{fontSize:15}}>
                {`Tiempo => ${item.tiempo} Minutos`}
              </Text>
            </View>
          )
        })}
          <Pressable style={style.btn_guardar} onPress={()=>BorrarHistorial()}>
            <Text>
            Borrar Histroial
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      }
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    alignItems:"center",
    marginBottom: 100
  },
    btn_guardar: {

      width: "80%",
      alignItems:"center",
      paddingBlock:2,
      paddingInline:4,
      backgroundColor:"#2298ff"
    },

    lines: {
      width:"100%",
      height:1,
      backgroundColor:"blue"

    }
  });