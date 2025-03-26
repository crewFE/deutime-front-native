import EventList from "@/src/components/EventList";
import { View, Text, Image } from "react-native";

export default function DetailsScreen({ route }) {
  const { id, descricao, fotoURL, type, sportName } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#001A6E",
      }}
    >
      <Image
        source={{ uri: fotoURL }}
        style={{
          width: "100%",
          height: "30%",
          borderWidth: 1,
          borderRadius: 6,
          borderColor: "#777",
        }}
      />
      <View
        style={{
          width: "100%",
          borderRadius: 8,
          borderColor: "black",
        }}
      >
        <Text
          style={{
            color: "#fafafa",
            fontSize: 24,
            fontWeight: "bold",
            margin: 2,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >
          {descricao}
        </Text>
        <Text
          style={{
            color: "#fafafa",
            fontSize: 18,
            fontWeight: "500",
            marginLeft: 30,
          }}
        >
          Eventos
        </Text>
        <View style={{ height: "75%" }}>
          <EventList id={id} type={type} sportName={sportName} />
        </View>
      </View>
    </View>
  );
}
