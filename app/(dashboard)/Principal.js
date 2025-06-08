import { Button, Pressable, Text, View, StyleSheet,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FondoBonito from "../../components/FondoBonito";

export default function PrincipalComponent({ navigation }) {
  const [data, setData] = useState("");
  const [meta, setMeta] = useState();

  const [historial, setHistorial] = useState();
  let kilometrosAcumulados = 0;
  let metaCumplida = false;

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
          setHistorial();
          kilometrosAcumulados = 0;
        }
      };
      getData();
      getHistorialMeta();
    }, [])
  );

  historial?.map(
    (item) => (kilometrosAcumulados += Number.parseInt(item.distancia))
  );
  if (kilometrosAcumulados >= meta) {
    metaCumplida = true;
  }
  let progreso = Math.min(Number(kilometrosAcumulados) / Number(meta), 1);

  return (
    <ScrollView style={style.container}>
      
      <FondoBonito />
      <Text style={style.title}>
        Hola, {data ? data + "!" : "desconocido !"}
      </Text>
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
        <View style={style.no_meta}>
          <Text style={{fontSize:20, textAlign:'center'}}>🚩 No tienes ninguna meta, quieres ingresar uno?</Text>
          {kilometrosAcumulados && (
            <Text style={{ fontSize: 16, textAlign:"center"}}>
              {kilometrosAcumulados.toString()} Km 🚶
            </Text>
          )}
        </View>
       
      )}
      <View style={style.btn_container}>
        <View style={style.btn_row_container}>
          <Pressable
            onPress={() => navigation.navigate("RegistrarEntrenamieno")}
            style={[style.btn_navegar, { backgroundColor: "green" }]}
          >
            <Text style={{ textAlign: "center", fontSize: 80 }}>📖</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Registrar Entrenamiento
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("FrasesMotivadoras")}
            style={[style.btn_navegar, { backgroundColor: "#ff6600" }]}
          >
            <Text style={{ textAlign: "center", fontSize: 80 }}>💪</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Ver Frases Motivadoras
            </Text>
          </Pressable>
        </View>
        <View style={style.btn_row_container}>
          <Pressable
            onPress={() => navigation.navigate("VerHistorial")}
            style={[style.btn_navegar, { backgroundColor: "#0066ff" }]}
          >
            <Text style={{ textAlign: "center", fontSize: 80 }}>📓</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Ver Historial
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("VerMetas")}
            style={[style.btn_navegar, { backgroundColor: "#000000" }]}
          >
            <Text style={{ textAlign: "center", fontSize: 80 }}>🏁</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Ingresar meta
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => navigation.replace("Home")}
          style={{ backgroundColor: "red", borderRadius: 16, padding: 12, marginBottom:50 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            LogOut
          </Text>
        </Pressable>
      </View>
    </ScrollView>
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
    marginTop:20,
    flex: 1,
    flexDirection: "column",
    gap: 12,
  },
  btn_row_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
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
    marginTop:20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 2,
    paddingBlock: 20,
    borderRadius: 16,
  },
  no_meta:{
    backgroundColor:"#ffffff",
    marginTop:20,
    textAlign:"center",
    gap:10,
    padding:20,
    borderRadius:20,
  }
});
