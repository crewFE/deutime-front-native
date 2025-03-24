import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Heading } from "@/components/ui/heading";
import { styles } from "./styles";
import { VStack } from "@/components/ui/vstack";
import EventList from "@/src/components/EventList";
import { useState } from "react";
import { Box } from "@/components/ui/box";
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
      if (!dateString) return ""; // Garante que não haja erro com valores vazios
      const [year, month, day] = dateString.split("-"); // Divide no formato YYYY-MM-DD
      return `${day}-${month}-${year}`; // Retorna no formato DD-MM-YYYY
    };
    const eventToSend = {
      ...newEvent,
      dataEvento: formatDate(newEvent.dataEvento),
      local: { id: parseInt(newEvent.local.id, 10) }, // Converte para número
      esporte: { id: parseInt(newEvent.esporte.id, 10) }, // Converte para número
      responsavel: { id: parseInt(newEvent.responsavel.id, 10) }, // Garante que seja número
    };

    console.log("Dados enviados:", eventToSend);

    try {
      const response = await ApiService.post("/eventos", eventToSend);
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
      <VStack className="flex flex-col justify-items-center items-center p-4">
        <View style={styles.form}>
          <TextInput
            placeholder="Busque Eventos..."
            placeholderTextColor="#bbb"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Box className="w-[95vw] h-[100vh] m-2 border rounded-lg">
          <EventList id="0" type="geral" searchQuery={searchQuery} />
        </Box>
      </VStack>

      <TouchableOpacity
        style={localStyles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={localStyles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={localStyles.modalContainer}>
          <View style={localStyles.modalContent}>
            <Text style={localStyles.modalTitle}>Criar Novo Evento</Text>
            <input
              type="text"
              placeholder="Descrição"
              value={newEvent.descricao}
              onChange={(e) =>
                setNewEvent({ ...newEvent, descricao: e.target.value })
              }
            />

            <input
              type="date"
              placeholder="Data"
              value={newEvent.dataEvento}
              onChange={(e) =>
                setNewEvent({ ...newEvent, dataEvento: e.target.value })
              }
            />

            <input
              type="time"
              placeholder="Hora Inicial"
              value={newEvent.horaInicial}
              onChange={(e) =>
                setNewEvent({ ...newEvent, horaInicial: e.target.value })
              }
            />

            <input
              type="time"
              placeholder="Hora Final"
              value={newEvent.horaFinal}
              onChange={(e) =>
                setNewEvent({ ...newEvent, horaFinal: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="ID do Local"
              value={newEvent.local.id}
              onChange={(e) =>
                setNewEvent({ ...newEvent, local: { id: e.target.value } })
              }
            />

            <input
              type="number"
              placeholder="ID do Esporte"
              value={newEvent.esporte.id}
              onChange={(e) =>
                setNewEvent({ ...newEvent, esporte: { id: e.target.value } })
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

const localStyles = StyleSheet.create({
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
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 8,
  },
});

export default Search;
