import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";

export default function RegistrarComponente() {
  const [fecha, setFecha] = useState(new Date());
  const [distancia, setDistancia] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [show, setShow] = useState(false);


function validarDatos (distancia, tiempo){
  if(!distancia|| isNaN(distancia)||distancia<=0)
  {
    alert("distancia debe ser positiva");
    return false;
  }
  if(!tiempo|| isNaN(tiempo)||tiempo<=0)
  {
    alert("tiempo debe ser positiva");
    return false;
  }
  return true
}

  async function GuardarDatos() {
    if (!validarDatos(distancia,tiempo))
      {
        return;
      }
    const filePath = FileSystem.documentDirectory + "historial.json";
    // si fecha, distancia y tiempo tenga datos
    if (fecha && distancia && tiempo) {
      let historial = [];
      const data = {
        fecha: fecha,
        distancia: distancia,
        tiempo: tiempo,
      };

      try {
        const file = await FileSystem.readAsStringAsync(filePath);

        if (!file) {
          historial.push(data);
          await FileSystem.writeAsStringAsync(
            filePath,
            JSON.stringify(historial)
          );
        }

        historial = JSON.parse(file);
        console.log(historial);
      } catch (e) {
        console.log(e);
      }
      historial.push(data);
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(historial));
      setFecha(new Date());
      setDistancia('');
      setTiempo(0);
      alert("El datos se guardo correctamente");
      return;
    }
    alert("tienes que tener datos para guardar");
    return;
  }

  return (
    <View>
      <Text>Registrar Entrenamiento</Text>
      <View>
        <Text>Fecha:</Text>
        <View>
          <Button title="Seleccionar fecha" onPress={() => setShow(true)} />
          {fecha && <Text>{fecha.toDateString()}</Text>}
        </View>
        {show && (
          <DateTimePicker
            locale="es-ES"
            value={fecha}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShow(false);
              if (date) setFecha(date);
            }}
          />
        )}
      </View>
      <View>
        <Text>Distancia:</Text>

        <TextInput
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderBlockColor: "black",
            height: 50,
            width: "100%",
          }}
          onChangeText={setDistancia}
        />
      </View>
      <View>
        <Text>Tiempo:</Text>

        <TextInput
          keyboardType="numeric"
          onChangeText={setTiempo}
          style={{
            borderWidth: 1,
            borderBlockColor: "black",
            height: 50,
            width: "100%",
          }}
        />
      </View>
      <Pressable style={style.btn_guardar} onPress={() => GuardarDatos()}>
        <Text>Guardar</Text>
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  btn_guardar: {
    width: "100%",
    paddingBlock: 2,
    paddingInline: 4,
    backgroundColor: "#2298ff",
  },
});
