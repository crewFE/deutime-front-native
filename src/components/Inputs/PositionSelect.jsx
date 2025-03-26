import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { usePacoteEsporte } from "@/src/api/hooks/usePacoteEsporte";

export default function PositionSelect({
  selected,
  onChange,
  eventId,
  sportId,
}) {
  const { loading, posicoes, fetchPosicoesById } = usePacoteEsporte();

  useEffect(() => {
    fetchPosicoesById(sportId);
  }, []);

  if (loading) return <ActivityIndicator size="small" color="#000" />;

  return (
    <View style={styles.container}>
      <Text style={[styles.modalTitle, { color: "#001A6E" }]}>
        Escolha sua posição:
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selected}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Selecione um..." value="" color="#999" />
          {posicoes.map((posicao) => (
            <Picker.Item
              key={posicao.id}
              label={posicao.descricao}
              value={String(posicao.id)}
              color="#000"
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerWrapper: {
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? 180 : 50,
    color: "#000",
  },
});
