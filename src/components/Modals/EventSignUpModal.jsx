import { usePacoteEsporte } from "@/src/api/hooks/usePacoteEsporte";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PositionSelect from "../Inputs/PositionSelect";

const EventSignUpModal = ({ visible, onClose, eventId }) => {
  if (!eventId) return null;
  const [posicaoId, setPosicaoId] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PositionSelect
            selected={posicaoId}
            onChange={setPosicaoId}
            eventId={eventId}
          />

          <View style={{ flexDirection: "row-reverse", gap: 50 }}>
            <Button
              title="Confirmar"
              onPress={() => {
                alert("Inscrição confirmada!");
                onClose();
              }}
            />

            <Button title="Cancelar" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
  },
});

export default EventSignUpModal;
