import { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useFrases from './../../utils/frases';

const frasesMotivadoras = useFrases
export default function FrasesComponente() {
  const [fraseElegida, setFraseElegida] = useState();
  const [mostrarFrase, setMostrarFrase] = useState(true);

  function MostrarFrase() {
    setMostrarFrase(true);
    setFraseElegida(frasesMotivadoras[Math.floor(Math.random() * 20)]);
  }
  useEffect(() => {
    setMostrarFrase(true);
    setFraseElegida(frasesMotivadoras[Math.floor(Math.random() * 20)]);
  }, []);

  return (
    <View style={style.container}>
      <LinearGradient
        colors={["#ff8800", "#00ffff"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      {fraseElegida && mostrarFrase && (
        <View style={style.fraseContainer}>
          <Pressable
            style={style.botonCerrar}
            onPress={() => setMostrarFrase(false)}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#ca0000" }}
            >
              X
            </Text>
          </Pressable>
          <Text style={{ fontSize: 20 }}>{fraseElegida.frase}</Text>
        </View>
      )}
      <Pressable onPress={() => MostrarFrase()}>
        <Text style={{ fontSize: 200 }}>👊</Text>
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  fraseContainer: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "white",
    top: 100,
    width: "90%",
    padding: 20,
    borderRadius: 16,
  },
  botonCerrar: {
    position: "absolute",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: 35,
    height: 35,
    right: 0,
    borderRadius: 16,
  },
});
