import React from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import ApiService from "@/src/api/api";
import { ActivityIndicator } from "react-native";

export default function CreateEventModal({
  visible,
  onClose,
  newEvent,
  setNewEvent,
  onSuccess,
}) {
  const handleCreateEvent = async () => {
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };

    const eventToSend = {
      ...newEvent,
      dataEvento: formatDate(newEvent.dataEvento),
      local: { id: parseInt(newEvent.local.id, 10) },
      esporte: { id: parseInt(newEvent.esporte.id, 10) },
      responsavel: { id: parseInt(newEvent.responsavel.id, 10) },
    };

    try {
      await ApiService.post("/eventos", eventToSend);
      alert("Evento criado com sucesso!");
      onSuccess();
    } catch (error) {
      alert("Erro ao criar evento!");
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      {false && ( //botar loading <--------
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Criar Novo Evento</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="#bbb"
            value={newEvent.descricao}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, descricao: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Data (AAAA-MM-DD)"
            placeholderTextColor="#bbb"
            value={newEvent.dataEvento}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, dataEvento: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Hora Inicial"
            placeholderTextColor="#bbb"
            value={newEvent.horaInicial}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, horaInicial: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Hora Final"
            placeholderTextColor="#bbb"
            value={newEvent.horaFinal}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, horaFinal: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="ID do Local"
            placeholderTextColor="#bbb"
            keyboardType="numeric"
            value={newEvent.local.id}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, local: { id: text } })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="ID do Esporte"
            placeholderTextColor="#bbb"
            keyboardType="numeric"
            value={newEvent.esporte.id}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, esporte: { id: text } })
            }
          />

          <View style={{ flexDirection: "row-reverse", gap: 5 }}>
            <Button title="Criar Evento" onPress={handleCreateEvent} />
            <Button title="Cancelar" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#ececec",
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
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
