import { useState, useRef } from "react"
import {View, Text, TextInput, Button,StyleSheet, Animated} from "react-native"
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";

export default function MetasComponentes({navigation}) {
  const [texto, setTexto] = useState(0);
  const [modal, setModal] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null)


  async function GuardarMetas() {
    try{
      await AsyncStorage.setItem('meta',texto)
      setModal(true)
      inputRef.current && inputRef.current.blur()
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setTimeout(()=>{
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => setModal(false));
      }, 3000)
    }catch(e){
      return
    }
  }
  
  return(
    <View style={style.container}>
      <LinearGradient 
      colors={["#8c00ff", "#ff00c8"]}
      start={{x:1, y:0}}
      end={{x:0,y:1}}
      style={{width:"100%", height:"100%", position:"absolute"}}
      />
      <View style={{flexDirection:"row", alignItems:"center"}}>  
        <TextInput
        ref={inputRef}
        keyboardType="numeric"
        onChangeText={setTexto}
        style={style.input}
        />
        <Text style={style.text}>Km</Text>
      </View>
      <Button title="Guardar metas" onPress={async () => await GuardarMetas()}/>
      {modal &&
        <Animated.View style={[style.modal, {opacity: fadeAnim}]}>
        <Text style={{fontSize:40}}>
          ✅
        </Text>
        <Text style={{fontSize:20, fontWeight:"bold"}}>
          Se establecio la meta
        </Text>
      </Animated.View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    position:"relative",
    justifyContent:"center",
    alignItems:"center",
    gap:20
  },
  input:{
    width:300,
    borderColor:"#00f7ff",
    borderWidth:2,
    borderTopLeftRadius:8,
    backgroundColor:"#ffffff",
    borderBottomLeftRadius:8
  },
  text:{
    fontSize:30,
    backgroundColor:"#00f7ff",
    height:"100%",
    borderWidth:2,
    borderColor:"#00f7ff",
    borderBottomRightRadius:8,
    borderTopRightRadius:8
    },
    modal:{
      top:100,
      position:"absolute",
      backgroundColor:"#ffffff",
      justifyContent:"center",
      alignItems:"center",
      padding:30,
      borderRadius:8
    }
})