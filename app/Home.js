import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, Button, Pressable } from "react-native"
import ButtonCompoente from "../components/ComponentB";

export default function HomeComponent ({navigation}) {

  const [contador, setContador] = useState(0);
  const [text, setText] = useState('')
  

  async function SetData () {
    try{
      await AsyncStorage.setItem('userName', text)
    }catch(e){
      return
    }
  }
  
  return(
    <View style={style.contaiiner}>
      <Text>
        Bienvenido
      </Text>
      <Text>
        Ingrese su nombre
      </Text>
      <TextInput
      style={{height:40, borderBlockColor: "#000000", borderColor:"#000000", borderWidth:1, width:"100%"}}
      onChangeText={setText}
      placeholder="Example"
      maxLength={10}
      keyboardType="default"
      />
      <Text>
        {text} 
      </Text>

      <Button title="Empezar" onPress={async()=>{
        await SetData()
        navigation.navigate("principal");
        }}/>
      <ButtonCompoente />
      <Pressable style={[{padding:10}, style.pressable ] }>
       <Text style={{color: "#ffffff"}}>
          botton
       </Text>
      </Pressable>
    </View>
  )
}


const style = StyleSheet.create({
  contaiiner : {
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  pressable: {
    backgroundColor: "#09c409ab",
    color: "#ffffff"
  }
})