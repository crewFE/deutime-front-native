import { Card } from "@/components/ui/card";
import { useNavigation } from "@react-navigation/native";
import { Heading } from "@/components/ui/heading";
import { Image, TouchableOpacity, View } from "react-native";

export function ImageCard({ id, fotoURL, descricao, type }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", { id, descricao, fotoURL, type })
      }
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          padding: 1,
          borderWidth: 4,
          borderRadius: 6,
          borderColor: "#ececec",
          backgroundColor: "#fafafa",
        }}
      >
        <Image
          source={{ uri: `${fotoURL}` }}
          style={{
            width: 200,
            height: 200,
            borderWidth: 4,
            padding: 2,
            borderRadius: 6,
            borderColor: "#fafafa",
          }}
          resizeMode="cover"
        />

        <Heading
          style={{
            textAlign: "center",
            textShadowColor: "rgb(0, 0, 0)",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
            color: "#444444",
            fontSize: 14,
            fontWeight: "semibold",
            overflow: "hidden",
          }}
          size="md"
        >
          {descricao}
        </Heading>
      </View>
    </TouchableOpacity>
  );
}
