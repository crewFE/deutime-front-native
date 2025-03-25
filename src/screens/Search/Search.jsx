import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import EventList from "@/src/components/EventList";
import { useState } from "react";
import ApiService from "@/src/api/api";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    descricao: "",
    dataEvento: "",
    horaInicial: "",
    horaFinal: "",
    local: { id: "" },
    esporte: { id: "" },
    responsavel: { id: 1 },
  });

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
      setModalVisible(false);
      setNewEvent({
        descricao: "",
        dataEvento: "",
        horaInicial: "",
        horaFinal: "",
        local: { id: "" },
        esporte: { id: "" },
        responsavel: { id: 1 },
      });
    } catch (error) {
      alert("Erro ao criar evento!");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Busque Eventos..."
          placeholderTextColor="#bbb"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View
        style={{ height: "84%", margin: 8, borderWidth: 1, borderRadius: 8 }}
      >
        <EventList id="0" type="geral" searchQuery={searchQuery} />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Novo Evento</Text>

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={newEvent.descricao}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, descricao: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Data (AAAA-MM-DD)"
              value={newEvent.dataEvento}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, dataEvento: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Hora Inicial"
              value={newEvent.horaInicial}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, horaInicial: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Hora Final"
              value={newEvent.horaFinal}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, horaFinal: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="ID do Local"
              keyboardType="numeric"
              value={newEvent.local.id}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, local: { id: text } })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="ID do Esporte"
              keyboardType="numeric"
              value={newEvent.esporte.id}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, esporte: { id: text } })
              }
            />

            <Button title="Criar Evento" onPress={handleCreateEvent} />
            <Button
              title="Cancelar"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001A6E",
    height: "100%",
  },
  form: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#ececec",
    color: "#000",
    fontSize: 16,
    marginTop: "10%",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#001A6E",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
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
});

export default Search;
