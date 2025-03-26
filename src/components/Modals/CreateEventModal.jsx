import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { usePacoteEvento } from "@/src/api/hooks/usePacoteEvento";
import { AuthContext } from "@/src/context/AuthContext";
import { esportes, locais } from "@/src/static/data";

export default function CreateEventModal({ visible, onClose }) {
  const { loading, error, createEvento } = usePacoteEvento();
  const { authData } = useContext(AuthContext);

  const [showSportPicker, setShowSportPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [newEvent, setNewEvent] = useState({
    descricao: "",
    dataEvento: "",
    horaInicial: "",
    horaFinal: "",
    local: { id: locais[0].id },
    esporte: { id: esportes[0].id },
    responsavel: { id: authData?.userId || 1 },
    nroMaximoParticipantes: "15",
  });

  const handleCreateEvent = async () => {
    // Format the date from YYYY-MM-DD to DD-MM-YYYY
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };

    const eventToSend = {
      descricao: newEvent.descricao,
      dataEvento: formatDate(newEvent.dataEvento),
      horaInicial: newEvent.horaInicial,
      horaFinal: newEvent.horaFinal,
      local: { id: newEvent.local.id },
      esporte: { id: newEvent.esporte.id },
      responsavel: { id: newEvent.responsavel.id },
      nroMaximoParticipantes: parseInt(newEvent.nroMaximoParticipantes, 10),
    };

    console.log("Submitting:", eventToSend);

    try {
      await createEvento(eventToSend);
      alert("Evento criado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Erro ao criar evento!");
    }
  };

  const handleSelectSport = (sport) => {
    setNewEvent({ ...newEvent, esporte: { id: sport.id } });
    setShowSportPicker(false);
  };

  const handleSelectLocation = (location) => {
    setNewEvent({ ...newEvent, local: { id: location.id } });
    setShowLocationPicker(false);
  };

  const getSelectedSportName = () => {
    return (
      esportes.find((s) => s.id === newEvent.esporte.id)?.nome ||
      "Selecione um esporte"
    );
  };

  const getSelectedLocationName = () => {
    return (
      locais.find((l) => l.id === newEvent.local.id)?.descricao ||
      "Selecione um local"
    );
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Criar Novo Evento</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição (ex: Basquete 30+)"
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
            placeholder="Hora Inicial (HH:MM)"
            placeholderTextColor="#bbb"
            value={newEvent.horaInicial}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, horaInicial: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Hora Final (HH:MM)"
            placeholderTextColor="#bbb"
            value={newEvent.horaFinal}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, horaFinal: text })
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Número máximo de participantes"
            placeholderTextColor="#bbb"
            keyboardType="numeric"
            value={newEvent.nroMaximoParticipantes}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, nroMaximoParticipantes: text })
            }
          />

          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowSportPicker(true)}
          >
            <Text>Esporte: {getSelectedSportName()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowLocationPicker(true)}
          >
            <Text>Local: {getSelectedLocationName()}</Text>
          </TouchableOpacity>

          {/* Sport Picker Modal */}
          <Modal visible={showSportPicker} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={esportes}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => handleSelectSport(item)}
                    >
                      <Text>{item.nome}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowSportPicker(false)}
                >
                  <Text>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Location Picker Modal */}
          <Modal visible={showLocationPicker} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={locais}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => handleSelectLocation(item)}
                    >
                      <Text>{item.descricao}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowLocationPicker(false)}
                >
                  <Text>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.buttonContainer}>
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
    maxHeight: "90%",
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
  pickerButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    padding: 15,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    gap: 5,
    marginTop: 10,
    justifyContent: "space-between",
  },
});
