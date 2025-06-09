import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  useColorScheme,
  Appearance,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import BotonGenerico from "../../components/BotonGenerico";

const path = FileSystem.documentDirectory + "historial.json";
export default function HistorialComponente({ navigation }) {
  const [data, setData] = useState();

  useEffect(() => {
    async function obtenerDatos() {
      try {
        setData(JSON.parse(await FileSystem.readAsStringAsync(path)));
      } catch (e) {
        console.log(e);
      }
    }
    obtenerDatos();
  }, []);
  console.log(data);
  
  function BorrarHistorial() {
    FileSystem.deleteAsync(path)
      .then(() => setData([]))
      .catch((e) => console.log(e));
    navigation.replace("VerHistorial");
  }

  return (
    <View style={style.container}>
      {data ? (
        <ScrollView >
          <View style={{ gap: 12, alignItems: "center" }}>
            {data.map((item, i) => {
              return (
                <View style={{width:"100%",}} key={i}>
                  <Text style={{ fontSize: 15, marginBottom: "10" }}>
                  Fecha: {item.fecha}
                  </Text>
                  <View style={style.card}>
                   <Text style={style.text}>
                      {`Distancia => ${item.distancia}Km`}
                    </Text>
                   <Text style={style.text}>
                      {`Tiempo => ${item.tiempo} Minutos`}
                    </Text>
                    <Text style={style.text}>
                      {`Entrenamiento => ${item.tipo}`}
                    </Text>
                  </View>
                </View>
              );
            })}

            <BotonGenerico
              title="Borrar historial"
              border="#c3390f"
              onPress={() => BorrarHistorial()}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={style.container_fallback}>
          <Text style={style.text_fallback}>
            No tienes historial registrado
          </Text>
          <Text style={{ fontSize: 45 }}>🗒️</Text>
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    marginBottom: 40,
  },

  card: {
    width:"100%",
    alignItems:"stretch",
    backgroundColor: "#ffffffd5",
    padding: 10,
    marginBottom:20,
    borderRadius: 20,
  },
  text: {
    color: "#4E4F4F",
    fontSize: 20,
  },
  container_fallback: {
    backgroundColor: "#ffffff",
    top: "40%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  text_fallback: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
