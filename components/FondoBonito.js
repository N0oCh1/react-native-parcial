import { View, Image, StyleSheet } from "react-native";


export default function FondoBonito({Tipo}) {
  const png = [
    require("../assets/iconbox.png"),
    require("../assets/icontenis.png"),
    require("../assets/iconbolos.png"),
    require("../assets/icongolf.png"),
    require("../assets/iconbeisboll.png"),
  ];

  const filas = 6;
  const columnas = 6;
  return (
    <View style={style.bg_repeat}>
      {[...Array(filas)].map((_, row) => (
        <View key={row} style={{ flexDirection: "row", gap: 8 }}>
          {[...Array(columnas)].map((_, col) => (
            <Image
              key={col}
              source={png[(row * columnas + col) % png.length]}
              style={{ width: 150, height: 150, opacity: 0.3 }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
const style = StyleSheet.create({
  bg_repeat: {
    position: "absolute",
    transform: [{ rotateZ: "30deg" }],
    gap: 8,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
