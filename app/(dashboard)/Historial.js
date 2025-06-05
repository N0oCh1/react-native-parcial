import {View, Text, ScrollView} from "react-native"
import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"


export default function HistorialComponente () {
  const [data, setData] = useState([]);

  useEffect (()=>{
    async function obtenerDatos() {
      try{
        const path = FileSystem.documentDirectory+'historial.json'
        setData(JSON.parse(await FileSystem.readAsStringAsync(path)))
      }catch(e){
        console.log(e)
      }
    }
    obtenerDatos()
  },[data])


  return (
    <View>
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
        </View>
      </ScrollView>
      }
    </View>
  )
}