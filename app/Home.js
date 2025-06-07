import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, Button, Pressable, Image, Animated } from "react-native"

export default function HomeComponent ({navigation}) {
  const [text, setText] = useState('')
  const [fadeAnim] = useState(new Animated.Value(1)); 

  const png = [
    require("../assets/iconbox.png"),
    require("../assets/icontenis.png"),
    require("../assets/iconbolos.png"),
    require("../assets/icongolf.png"),
    require("../assets/iconbeisboll.png"),
  ]
  
  const filas = 6;
  const columnas = 6;
  async function SetData () {
    try{
      await AsyncStorage.setItem('userName', text)
    }catch(e){
      return
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
      fadeAnim.setValue(1); // Reset para cuando vuelvas a la pantalla
    });
  };
  
  return(
    <View style={style.contaiiner}>
      <View style={style.bg_repeat}>
        {[...Array(filas)].map((_, row) => (
          <View key={row} style={{flexDirection: "row", gap:8}}>
            {[...Array(columnas)].map((_, col) => (
              <Image
                key={col}
                source={png[(row * columnas + col) % png.length]}
                style={{width:150, height:150, opacity:0.30}}
              />
            ))}
          </View>
        ))}
      </View>
      <Animated.View style={[style.form_container, {opacity: fadeAnim}]}>
        <Text style={{fontSize:45, fontWeight:"bold"}}>
          Bienvenido!
        </Text>
        <Text>
          Ingrese su nombre
        </Text>
        <TextInput
          style={style.input}
          onChangeText={setText}
          placeholder="Example"
          maxLength={10}
          keyboardType="default"
        />
        <Pressable style={style.pressable} onPress={handleAcceder}>
          <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>Acceder</Text>
        </Pressable>
      </Animated.View>
      
      
    </View>
  )
}


const style = StyleSheet.create({
  contaiiner : {
    flex:1,
    gap:12,
    padding:20,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:'center',
    position:"relative"
  },
  form_container:{
    justifyContent:"center",
    alignItems:"center",
    padding:32,
    borderRadius:10,
    backgroundColor:"#ffffffbb",
    gap:12
  },
  pressable: {
    backgroundColor: "#09c409ab",
    color: "#ffffff",
    paddingBlock: 10,
    paddingInline:20,
    borderRadius:10
  },
  img_container:{
    width:"100%",
    top:0,
    gap:8,
    flexDirection: "row",
    flexWrap:"wrap",
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    opacity:0.5
  },
  input:{
    height:40, 
    borderBlockColor: "#000000", 
    borderColor:"#000000", 
    backgroundColor:"#ffffff",
    borderWidth:2, 
    borderRadius: 8,
    width:200
  },
  bg_repeat: {
    position: "absolute",
    transform:[{rotateZ:"30deg"}],
    gap:8,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
})