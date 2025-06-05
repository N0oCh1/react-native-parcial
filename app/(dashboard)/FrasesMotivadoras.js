import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";

const frasesMotivadoras = [
  { id: 1, frase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día." },
  { id: 2, frase: "No cuentes los días, haz que los días cuenten." },
  { id: 3, frase: "La disciplina es el puente entre metas y logros." },
  { id: 4, frase: "Cree en ti y todo será posible." },
  { id: 5, frase: "El único lugar donde el éxito viene antes que el trabajo es en el diccionario." },
  { id: 6, frase: "No te rindas, el principio siempre es la parte más difícil." },
  { id: 7, frase: "Haz hoy lo que otros no quieren, y mañana vivirás como otros no pueden." },
  { id: 8, frase: "La motivación te impulsa, el hábito te mantiene." },
  { id: 9, frase: "El dolor es temporal, el orgullo es para siempre." },
  { id: 10, frase: "Si puedes soñarlo, puedes lograrlo." }
];

export default function FrasesComponente() {
  const [fraseElegida, setFraseElegida] = useState()

  useEffect(()=>{
    setFraseElegida(frasesMotivadoras[Math.floor(Math.random()*10)])
  },[fraseElegida])

  return (
    <View >
      <Text>
        Hola estas son las frases motivadoreas
      </Text>
      {fraseElegida && 
        <View>
          <Text>
            {fraseElegida.frase}
          </Text>
        </View>
      }
      <Button title="generar mas frases" onPress={()=>setFraseElegida()}/>
    </View>
  )
}