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
      <Text>
        Hola este es historial
      </Text>
      {data && 
      <ScrollView >
        <View style={{gap:12}}>
        {data.map((item,i) => {
          return(
            <View key={i}>
              <Text>
                {`Fecha => ${item.fecha}`}
              </Text>
              <Text>
                {`Distancia => ${item.distancia}Km`}
              </Text>
              <Text>
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
    marginBottom: 100
  },
    btn_guardar: {
      width: "100%",
      paddingBlock:2,
      paddingInline:4,
      backgroundColor:"#2298ff"
    }
  });