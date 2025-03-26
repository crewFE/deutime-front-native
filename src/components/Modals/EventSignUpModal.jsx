import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PositionSelect from "../Inputs/PositionSelect";
import { useEventoParticipantes } from "@/src/api/hooks/useEventoParticipantes";
import { AuthContext } from "@/src/context/AuthContext";

const EventSignUpModal = ({ visible, onClose, eventId, sportId }) => {
  if (!eventId) return null;
  const [posicaoId, setPosicaoId] = useState("");
  const { loading, createParticipante } = useEventoParticipantes();
  const { authData } = useContext(AuthContext);

  const handleSignUpEvent = async () => {
    const participacao = {
      evento: { id: eventId },
      posicao: { id: Number(posicaoId) },
      usuario: { id: authData?.userId },
    };

    try {
      await createParticipante(participacao);
      alert("Inscrição realizada com sucesso!");
      onClose();
    } catch (error) {
      console.log("Erro API:", error);
      alert("Erro ao se inscrever. Tente novamente.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PositionSelect
            selected={posicaoId}
            onChange={setPosicaoId}
            eventId={eventId}
            sportId={sportId}
          />

          <View style={{ flexDirection: "row-reverse", gap: 50 }}>
            <Button
              title="Confirmar"
              onPress={() => {
                if (!posicaoId || isNaN(Number(posicaoId))) {
                  alert("Selecione uma posição antes de confirmar.");
                  return;
                }
                handleSignUpEvent();
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

export default EventSignUpModal;
