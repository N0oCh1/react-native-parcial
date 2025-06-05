import {View, Text, TextInput, Pressable} from "react-native"

export default function RegistrarComponente () {
  const formater = new Intl.DateTimeFormat('es-EN', {day:"2-digit", month:"2-digit",year:"numeric"})
  const date = new Date()
  const fechaFormateada = formater.format(date).toString()
  
  return (
    <View>
      <Text>
        Registrar Entrenamiento
      </Text>
      <View>
        <Text>
          Fecha:
        </Text>

        <TextInput
        readOnly ={true}
          placeholder={`${date}`}
          value={fechaFormateada}
          style = {{borderWidth:1, borderBlockColor:"black", height:50, width:"100%"}}
        />
      </View>
      <View>
        <Text>
          Distancia:
        </Text>

        <TextInput
          keyboardType="numeric"
          style = {{borderWidth:1, borderBlockColor:"black", height:50, width:"100%"}}
        />
      </View>
      <View>
        <Text>
          Tiempo:
        </Text>

        <TextInput
          keyboardType="numeric"
          style = {{borderWidth:1, borderBlockColor:"black", height:50, width:"100%"}}
        />
      </View>
      <Pressable>
        <Text>
          Guardar
        </Text>
      </Pressable>
    </View>
  )
}