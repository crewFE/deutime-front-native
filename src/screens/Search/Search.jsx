import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import EventList from "@/src/components/EventList";
import { useState } from "react";
import CreateEventModal from "@/src/components/Modals/CreateEventModal";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleClose = () => {
    setModalVisible(false);
    setRefreshTrigger((prev) => prev + 1);
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

      <View style={{ height: "85%" }}>
        <EventList
          id="0"
          type="geral"
          searchQuery={searchQuery}
          refreshTrigger={refreshTrigger}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <CreateEventModal visible={modalVisible} onClose={() => handleClose()} />
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
