import { View, TextInput, Text, StyleSheet } from "react-native";
import React from "react";

const InputConTexto = React.forwardRef(({ Texto, onChange, value }, ref, ...input) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center",width:"100%"}}>
      <TextInput
       value={value}
        {...input}
        ref={ref}
        keyboardType="numeric"
        onChangeText={onChange}
        style={style.input}
      />
      <Text style={style.text}>{Texto}</Text>
    </View>
  );
});

export default InputConTexto;

const style = StyleSheet.create({
  input: {
    width: 200,
    borderColor: "#00f7ff",
    borderWidth: 2,
    borderTopLeftRadius: 18,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 18,
  },
  text: {
    color:"#4E4F4F",
    fontSize: 25,
    width:50,
    backgroundColor: "#00f7ff",
    height: "100%",
    borderWidth: 2,
    justifyContent:"center",
    borderColor: "#00f7ff",
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
  },
});