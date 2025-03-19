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
    local: "",
    esporte: "",
  });

  const handleCreateEvent = async () => {
    try {
      const response = await ApiService.post("/eventos", newEvent);
      alert("Evento criado com sucesso!");
      setModalVisible(false);
      setNewEvent({
        descricao: "",
        dataEvento: "",
        horaInicial: "",
        horaFinal: "",
        local: "",
        esporte: "",
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
            <TextInput
              style={localStyles.input}
              placeholder="Descrição"
              value={newEvent.descricao}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, descricao: text })
              }
            />
            <TextInput
              style={localStyles.input}
              placeholder="Data (YYYY-MM-DD)"
              value={newEvent.dataEvento}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, dataEvento: text })
              }
            />
            <TextInput
              style={localStyles.input}
              placeholder="Hora Inicial (HH:MM)"
              value={newEvent.horaInicial}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, horaInicial: text })
              }
            />
            <TextInput
              style={localStyles.input}
              placeholder="Hora Final (HH:MM)"
              value={newEvent.horaFinal}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, horaFinal: text })
              }
            />
            <TextInput
              style={localStyles.input}
              placeholder="Local"
              value={newEvent.local}
              onChangeText={(text) => setNewEvent({ ...newEvent, local: text })}
            />
            <TextInput
              style={localStyles.input}
              placeholder="Esporte"
              value={newEvent.esporte}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, esporte: text })
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
