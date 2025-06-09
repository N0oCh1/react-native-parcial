import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BotonGenericoPrincipal = ({ emogi = "", title = "",border="#c3390f",  onPress }) => {
  return (
    <LinearGradient
      colors={["#FEFFFE", "#A1A5A5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.2 }}
      style={[styles.gradientPrincipal, {borderColor: border}]}
      
    >
      <Pressable style={styles.pressable} onPress={onPress}>
        <Text style={{ fontSize: 80 }}> {emogi} </Text>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientPrincipal: {
    width: "48%",
    height: 200,
    flexDirection: 'column',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pressable: {
    width:"100%" ,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#4E4F4F",
    fontSize: 20,
  },
});

export default BotonGenericoPrincipal;
