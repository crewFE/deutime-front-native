import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

function TextCard({ id, descricao, fotoURL, type, sportName }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          id,
          descricao,
          fotoURL,
          type,
          sportName,
        })
      }
    >
      <Text style={styles.textCard}>{descricao}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    marginHorizontal: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 5,
  },
  textCard: {
    color: "#444444",
    fontSize: 14,
    fontWeight: "semibold",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 6,
    padding: 6,
  },
});

export default TextCard;
