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
      <Card
        style={{
          maxWidth: "60vw",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Image
            source={{ uri: `${fotoURL}` }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 2,
              elevation: 8,
            }}
            resizeMode="cover"
          />
        </View>

        <Heading
          style={{
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
          }}
          size="lg"
        >
          {descricao}
        </Heading>
      </Card>
    </TouchableOpacity>
  );
}
