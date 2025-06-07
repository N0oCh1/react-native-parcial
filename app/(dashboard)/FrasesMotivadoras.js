import { useEffect, useState } from "react";
import { Text, View, Button,ImageBackground, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const frasesMotivadoras = [
  { id: 1, frase: "🌟 El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito." },
  { id: 2, frase: "🚀 No importa lo lento que avances, siempre y cuando no te detengas. ¡Sigue adelante y conquista tus sueños!" },
  { id: 3, frase: "💪 La fuerza no proviene de la capacidad física, sino de una voluntad indomable. ¡Cree en ti y lograrás lo imposible!" },
  { id: 4, frase: "🔥 Cada día es una nueva oportunidad para cambiar tu vida. ¡Aprovecha el presente y hazlo increíble!" },
  { id: 5, frase: "🌈 Después de la tormenta siempre sale el sol. Mantén la esperanza y sigue luchando por tus metas." },
  { id: 6, frase: "🏆 El único lugar donde el éxito viene antes que el trabajo es en el diccionario. ¡Trabaja duro y verás resultados!" },
  { id: 7, frase: "🧗‍♂️ Los grandes logros requieren grandes sacrificios. No temas al esfuerzo, ¡es tu mejor aliado!" },
  { id: 8, frase: "🦁 La valentía no es la ausencia de miedo, sino la conquista de él. ¡Atrévete a dar el siguiente paso!" },
  { id: 9, frase: "🌻 Siembra hoy el esfuerzo que mañana cosecharás en logros. ¡No te rindas, tu futuro te lo agradecerá!" },
  { id: 10, frase: "⏳ El tiempo es ahora. No esperes el momento perfecto, haz que cada momento cuente." },
  { id: 11, frase: "🛤️ El camino al éxito está lleno de obstáculos, pero cada uno te hace más fuerte. ¡Sigue avanzando!" },
  { id: 12, frase: "💡 La motivación te impulsa a empezar, pero el hábito te mantiene en movimiento. ¡Construye hábitos positivos!" },
  { id: 13, frase: "🌠 No sueñes tu vida, vive tu sueño. ¡Haz que cada día sea una aventura hacia tus metas!" },
  { id: 14, frase: "🏃‍♀️ Cada paso que das te acerca a tu meta. No subestimes el poder de la constancia." },
  { id: 15, frase: "🧠 La mente es tu mayor músculo. Entrénala para ver oportunidades donde otros ven obstáculos." },
  { id: 16, frase: "🌅 Cada amanecer es una nueva oportunidad para ser mejor que ayer. ¡Aprovéchala al máximo!" },
  { id: 17, frase: "🎯 Apunta alto, trabaja duro y nunca pierdas la fe en ti mismo. ¡El éxito está más cerca de lo que crees!" },
  { id: 18, frase: "🛡️ Los desafíos son pruebas que te preparan para grandes victorias. ¡Enfréntalos con determinación!" },
  { id: 19, frase: "🌳 El crecimiento personal es un viaje, no un destino. Disfruta cada aprendizaje en el camino." },
  { id: 20, frase: "✨ Cree en la magia de los nuevos comienzos. Hoy puede ser el primer día del resto de tu vida." }
];

export default function FrasesComponente() {
  const [fraseElegida, setFraseElegida] = useState()
  const [mostrarFrase, setMostrarFrase] = useState(true)

  function MostrarFrase() {
    setMostrarFrase(true)
    setFraseElegida(frasesMotivadoras[Math.floor(Math.random()*20)])
  }
  useEffect(()=>{
    setMostrarFrase(true)
    setFraseElegida(frasesMotivadoras[Math.floor(Math.random()*20)])
  },[])

  return (
    <View style={style.container}>
      <LinearGradient 
      colors={["#ff8800", "#00ffff"]}
      start={{x:1, y:0}}
      end={{x:0,y:1}}
      style={{width:"100%", height:"100%", position:"absolute"}}
      />
      {fraseElegida && mostrarFrase &&
        <View style={style.fraseContainer}>
          <Pressable style={style.botonCerrar} onPress={()=>setMostrarFrase(false)}>
            <Text style={{fontSize:20, fontWeight:"bold"}}>X</Text>
          </Pressable >
          <Text style={{fontSize:20}}>
            {fraseElegida.frase}
          </Text>
        </View>
      }
      <Pressable onPress={()=>MostrarFrase()}>
        <Text style={{fontSize:200}}>
          👊
        </Text>
      </Pressable>   
    </View>
  )
}
const style = StyleSheet.create({
  container:{
    position: "relative",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    
  },
  fraseContainer:{
    position:"absolute",
    zIndex:10,
    backgroundColor:"white",
    top:100,
    width:400,
    padding:20,
    borderRadius: 16
  },
  botonCerrar: {
    position: "absolute",
    backgroundColor:"#c9c9c9",
    justifyContent:"center",
    alignItems:"center",
    padding:0,
    width:35,
    height:35,
    right:0,
    borderRadius:16
  }
})