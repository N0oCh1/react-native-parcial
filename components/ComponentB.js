import { Pressable, Text } from "react-native";



export default function ButtonCompoente ({title, onPress} ) {
  return(
    <Pressable style = {{padding:12, backgroundColor: "#5e5454"}} onPress={()=>onPress}>
      <Text style ={{color: "white"}}>
        {title}
      </Text>
    </Pressable>
  )
}