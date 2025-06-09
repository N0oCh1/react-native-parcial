import {
  Button,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FondoBonito from "../../components/FondoBonito";
import BotonGenerico from "../../components/BotonGenerico";
import BotonGenericoPrincipal from "../../components/BotonPrincipal";

export default function PrincipalComponent({ navigation }) {
  const [data, setData] = useState("");
  const [meta, setMeta] = useState();

  const [historial, setHistorial] = useState();
  let kilometrosAcumulados = 0;
  let metaCumplida = false;

  // Obtener los datos del localStora (SharePreference) cade vez que entra en la pagina
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const value = await AsyncStorage.getItem("userName");
        setMeta(await AsyncStorage.getItem("meta"));
        setData(value);
      };
      const getHistorialMeta = async () => {
        try {
          const file = await FileSystem.readAsStringAsync(
            FileSystem.documentDirectory + "historial.json"
          );
          if (!file) {
            setHistorial();
            return;
          }
          setHistorial(JSON.parse(file));
        } catch (e) {
          // para cualquier error setea a 0 los vlaores
          setHistorial();
          kilometrosAcumulados = 0;
        }
      };
      getData();
      getHistorialMeta();
    }, [])
  );

  // logica para optiener los kilometros acumulados
  historial?.map(
    (item) => (kilometrosAcumulados += Number.parseInt(item.distancia))
  );
  // logica para saber si el usuario llego a la meta
  if (kilometrosAcumulados >= meta) {
    metaCumplida = true;
  }
  // logica para saber el progreso
  let progreso = Math.min(Number(kilometrosAcumulados) / Number(meta), 1);

  return (
    <View style={style.container}>
      <FondoBonito />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={style.title}>
          Hola, {data ? data + "!" : "desconocido !"}
        </Text>
        {/* Existe alguna meta?  */}
        {meta > 0 ? (
          <View style={style.progress_container}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              🏁 Tu meta: {meta.toString()}KM
            </Text>
            {metaCumplida && <Text>Meta cumplida !</Text>}
            <Progress.Bar
              progress={progreso}
              color={metaCumplida ? "#00ff0d" : "#00ccff"}
              width={300}
              height={20}
            />
            {kilometrosAcumulados && (
              <Text style={{ fontSize: 16 }}>
                {kilometrosAcumulados.toString()} Km 🚶
              </Text>
            )}
          </View>
        ) : (
          // si no existe ninguna meta
          <View style={style.no_meta}>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              🚩 No tienes ninguna meta, quieres ingresar uno?
            </Text>
            {kilometrosAcumulados && (
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {kilometrosAcumulados.toString()} Km 🚶
              </Text>
            )}
          </View>
        )}
        <View style={style.btn_container}>
          <View style={style.btn_row_container}>
            <BotonGenericoPrincipal
              emogi="📖"
              title="Regitrar Ejercicio"
              border="green"
              onPress={() => navigation.navigate("RegistrarEntrenamieno")}
            />
            <BotonGenericoPrincipal
              emogi="💪"
              title="Motivacion"
              border="#ff6600"
              onPress={() => navigation.navigate("FrasesMotivadoras")}
            />
          </View>
          <View style={style.btn_row_container}>
            <BotonGenericoPrincipal
              emogi="📓"
              title="historial"
              border="#0066ff"
              onPress={() => navigation.navigate("VerHistorial")}
            />
            <BotonGenericoPrincipal
              emogi="🏁"
              title="Metas"
              border="#000"
              onPress={() => navigation.navigate("VerMetas")}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <BotonGenerico
              title="Log Out"
              border="red"
              onPress={() => navigation.replace("Home")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    gap: 12,
    padding: 10,
  },
  btn_container: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
    gap: 12,
  },
  btn_row_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 5,
  },
  btn_navegar: {
    flexDirection: "column",
    height: 200,
    width: "48%",
    borderRadius: 20,
    padding: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 30,
    padding: 4,
    borderRadius: 16,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#008791",
    backgroundColor: "#ffffff",
    color: "#008f99",
  },
  progress_container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 2,
    paddingBlock: 20,
    borderRadius: 16,
  },
  no_meta: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    textAlign: "center",
    gap: 10,
    padding: 20,
    borderRadius: 20,
  },
});
