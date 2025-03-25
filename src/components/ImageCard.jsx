import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function ImageCard({ id, fotoURL, descricao, type }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", { id, descricao, fotoURL, type })
      }
    >
      <View style={styles.container}>
        <LinearGradient colors={["#ffffff", "#f2f2f2"]} style={styles.card}>
          <Image
            source={{ uri: fotoURL }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.cardText}>{descricao}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});
