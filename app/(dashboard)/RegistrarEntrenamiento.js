import { useState } from "react"
import {View, Text, TextInput, Pressable, StyleSheet, Platform, Button} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



export default function RegistrarComponente () {
  
  const [fecha, setFecha] = useState(new Date())
  const [distancia, setDistancia] = useState('')
  const [tiempo, setTiempo] = useState('');
  
  const [show,setShow] = useState(false)

  async function GuardarDatos() {
    const filePath = FileSystem.documentDirectory+ 'historial.json';
    if(fecha && distancia && tiempo){
      let historial = [];
      const data = {
        id: uuidv4(),
        fecha : fecha,
        distancia: distancia,
        tiempo: tiempo
      }

        try {
        const file = await FileSystem.readAsStringAsync(filePath);
        historial = JSON.parse(file);
      } catch (e) {
        
      }

      historial.push(data);
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(historial));
      alert("El dato se guardó correctamente");
      return;
    }
    alert('Tienes que tener datos para guardar');
    return;
  }
  
  return (
    <View>
      <Text>
        Registrar Entrenamiento
      </Text>
      <View>
        <Text>
          Fecha:
        </Text>
        <View>
          <Button title="Seleccionar fecha" onPress={()=>setShow(true)}/>
          {fecha&&<Text>{fecha.toDateString()}</Text>}
        </View>
        {show&&
          <DateTimePicker
            locale='es-ES'
            value={fecha}
            mode="date"
            display={Platform.OS === "ios" ? 'spinner' : 'default'} 
            onChange={(event, date) => {
              setShow(false)
              if(date) setFecha(date)
            }}
          />
        }

      </View>
      <View>
        <Text>
          Distancia:
        </Text>

        <TextInput
          keyboardType="numeric"
          style = {{borderWidth:1, borderBlockColor:"black", height:50, width:"100%"}}
          onChangeText={setDistancia}
        />
      </View>
      <View>
        <Text>
          Tiempo:
        </Text>

        <TextInput
          keyboardType="numeric"
          onChangeText={setTiempo}
          style = {{borderWidth:1, borderBlockColor:"black", height:50, width:"100%"}}
        />
      </View>
      <Pressable style={style.btn_guardar} onPress={()=> GuardarDatos()}>
        <Text>
          Guardar
        </Text>
      </Pressable>
      
    </View>
  )
}
  const style = StyleSheet.create({
    btn_guardar: {
      width: "100%",
      paddingBlock:2,
      paddingInline:4,
      backgroundColor:"#2298ff"
    }
  });