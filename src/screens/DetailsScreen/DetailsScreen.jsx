import { View, Text, Image } from "react-native";

export default function DetailsScreen({ route }) {
  const { descricao, fotoURL } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={{ uri: fotoURL }}
        style={{ width: 300, height: 300, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        {descricao}
      </Text>
    </View>
  );
}
