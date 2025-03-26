import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEventoParticipantes } from "@/src/api/hooks/useEventoParticipantes";
import EventSignUpModal from "./EventSignUpModal";

const EventDetailsModal = ({ visible, event, onClose }) => {
  const [signUpVisible, setSignUpVisible] = useState(false);

  const { loading, participantes, fetchParticipanteById } =
    useEventoParticipantes();

  useEffect(() => {
    if (event?.id) {
      fetchParticipanteById(event.id);
    }
  }, [event]);

  const renderItem = ({ item }) => (
    <View style={styles.participanteItem}>
      <Text style={styles.participanteNome}>{item.nomeParticipante}</Text>
      <Text style={styles.participantePosicao}>{item.posicao}</Text>
    </View>
  );

  const handleClose = () => {
    setSignUpVisible(false);
    fetchParticipanteById(event.id);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{event?.descricao}</Text>
          <Image
            source={{ uri: event?.esporte?.imagem }}
            style={styles.modalImage}
          />

          <Text style={styles.modalDetails}>Data: {event?.dataEvento}</Text>
          <Text style={styles.modalDetails}>
            Horário: {event?.horaInicial} - {event?.horaFinal}
          </Text>
          <Text style={styles.modalDetails}>
            Local: {event?.local?.descricao}
          </Text>
          <Text style={[styles.modalTitle, { color: "#001A6E" }]}>
            Participantes: {participantes.length} /{" "}
            {event?.nroMaximoParticipantes}
          </Text>
          <View
            style={{
              height: 400,
              width: "100%",
              borderWidth: 2,
              borderRadius: 8,
              alignContent: "center",
              borderColor: "#001A6E",
            }}
          >
            {!loading && (
              <FlatList
                data={participantes || []}
                keyExtractor={(item, index) => item.nomeParticipante + index}
                renderItem={renderItem}
                style={styles.flatlist}
              />
            )}
          </View>

          <View style={{ flexDirection: "row-reverse", gap: 50 }}>
            <Button
              title="Inscrever-se"
              onPress={() => setSignUpVisible(true)}
            />
            <Button title="Fechar" color="red" onPress={onClose} />
          </View>
        </View>
      </View>

      <EventSignUpModal
        visible={signUpVisible}
        onClose={() => handleClose()}
        eventId={event?.id}
        sportId={event?.esporte.id}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#001A6E",
  },
  modalDetails: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
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
  flatlist: {
    width: "100%",
    marginVertical: 10,
  },
  participanteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  participanteNome: {
    fontWeight: "bold",
    fontSize: 15,
  },
  participantePosicao: {
    fontSize: 14,
    color: "#555",
  },
});

export default EventDetailsModal;
