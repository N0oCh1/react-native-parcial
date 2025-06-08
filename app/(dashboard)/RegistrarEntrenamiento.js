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
import InputConTexto from "../../components/InputConTexto";
import {LinearGradient} from "expo-linear-gradient";

export default function RegistrarComponente() {
  const [fecha, setFecha] = useState(new Date());
  const formattedFecha = `${fecha.getDate()}-${
    fecha.getMonth() + 1
  }-${fecha.getFullYear()} ${fecha.toLocaleTimeString()}`;
  const [distancia, setDistancia] = useState("");
  const [tiempo, setTiempo] = useState(0);
  const [show, setShow] = useState(false);

  function validarDatos(distancia, tiempo) {
    if (!distancia || isNaN(distancia) || distancia <= 0) {
      alert("distancia debe ser positiva");
      return false;
    }
    if (!tiempo || isNaN(tiempo) || tiempo <= 0) {
      alert("tiempo debe ser positiva");
      return false;
    }
    return true;
  }

  async function GuardarDatos() {
    if (!validarDatos(distancia, tiempo)) return;
    const filePath = FileSystem.documentDirectory + "historial.json";
    // si fecha, distancia y tiempo tenga datos
    if (fecha && distancia && tiempo) {
      let historial = [];
      const data = {
        fecha: formattedFecha,
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
      setDistancia("");
      setTiempo(0);
      alert("El datos se guardo correctamente");
      return;
    }
    alert("tienes que tener datos para guardar");
    return;
  }

  return (
    <View style={{position:'relative', flex:1, alignItems:"center"}}>
      <LinearGradient
        colors={["#8c00ff", "#ff00c8"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ width: "100%", height: "100%", position: "absolute",}}
      />
      <View style={style.container}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text>Fecha:</Text>
            {fecha && (
              <Text style={{ fontWeight: "bold" }}>{fecha.toDateString()}</Text>
            )}
          </View>
          <Button title="Seleccionar fecha" onPress={() => setShow(true)} />
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
          <InputConTexto value={distancia} onChange={setDistancia} Texto="Km" />
        </View>
        <View>
          <Text>Tiempo:</Text>

          <InputConTexto value={tiempo} onChange={setTiempo} Texto="Min" />
        </View>
        <Pressable style={style.btn_guardar} onPress={() => GuardarDatos()}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Guardar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    top:100,
    padding: 20,
    alignItems: "center",
    backgroundColor:"#ffffffd5",
    borderRadius:20,
    gap: 20,
  },
  btn_guardar: {
    width: 200,
    paddingBlock: 6,
    paddingInline: 8,
    backgroundColor: "#2298ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
