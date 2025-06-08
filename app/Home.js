import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  Animated,
} from "react-native";
import FondoBonito from "../components/FondoBonito";

export default function HomeComponent({ navigation }) {
  const [text, setText] = useState("");
  const [fadeAnim] = useState(new Animated.Value(1));

  async function SetData() {
    try {
      await AsyncStorage.setItem("userName", text);
    } catch (e) {
      return;
    }
  }
  const handleAcceder = async () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(async () => {
      await SetData();
      navigation.replace("principal");
      fadeAnim.setValue(1); 
    });
  };

  return (
    <View style={style.contaiiner}>
      <FondoBonito />
      <Animated.View style={[style.form_container, { opacity: fadeAnim }]}>
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>Bienvenido!</Text>
        <Text>Ingrese su nombre</Text>
        <TextInput
          style={style.input}
          onChangeText={setText}
          placeholder="Example"
          maxLength={10}
          keyboardType="default"
        />
        <Pressable style={style.pressable} onPress={handleAcceder}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Acceder
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  contaiiner: {
    flex: 1,
    gap: 12,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  form_container: {
    justifyContent: "center",
    top:200,
    alignItems: "center",
    padding: 32,
    borderRadius: 10,
    backgroundColor: "#ffffffd3",
    gap: 12,
  },
  pressable: {
    backgroundColor: "#09c409ab",
    color: "#ffffff",
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
  },
  img_container: {
    width: "100%",
    top: 0,
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    opacity: 0.5,
  },
  input: {
    height: 40,
    borderBlockColor: "#000000",
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 8,
    width: 200,
  },
});
