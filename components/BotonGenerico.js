import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BotonGenerico = ({ title = "", border, onPress }) => {
  return (
    <LinearGradient
      colors={["#EBE9E9", "#DBDBDB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      style={[styles.gradient,{borderColor:border}]}
    >
  
      <Pressable style={styles.pressable} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
 
      </Pressable>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  gradient: {
    width: "70%",
    height: 45,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pressable: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#4E4F4F",
    fontSize: 20,
  },
});

export default BotonGenerico;