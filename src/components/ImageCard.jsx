import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function ImageCard({ id, fotoURL, descricao, type, disabled }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() =>
        navigation.navigate("Details", { id, descricao, fotoURL, type })
      }
    >
      <View style={styles.container}>
        <LinearGradient
          colors={disabled ? ["#e0e0e0", "#c0c0c0"] : ["#ffffff", "#f2f2f2"]}
          style={[styles.card, disabled && styles.disabledCard]}
        >
          <Image
            source={{ uri: fotoURL }}
            style={[styles.image, disabled && styles.disabledImage]}
            resizeMode="cover"
          />
          <Text style={[styles.cardText, disabled && styles.disabledText]}>
            {descricao}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  disabledCard: {
    opacity: 0.6,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  disabledImage: {
    opacity: 0.6,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  disabledText: {
    color: "#999",
  },
});
