import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";

const EventList = ({ id, type }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url =
        type === "court"
          ? `https://deutime-backend-spring.onrender.com/eventos/local/${id}`
          : `https://deutime-backend-spring.onrender.com/eventos/modalidade/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Image source={{ uri: item.esporte.imagem }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.descricao}</Text>
        <Text
          style={styles.details}
        >{`${item.dataEvento} - ${item.horaInicial} às ${item.horaFinal}`}</Text>
        <Text style={styles.location}>{item.local.descricao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          {selectedEvent && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedEvent.descricao}</Text>
              <Image
                source={{ uri: selectedEvent.esporte.imagem }}
                style={styles.modalImage}
              />
              <Text
                style={styles.modalDetails}
              >{`Data: ${selectedEvent.dataEvento}`}</Text>
              <Text
                style={styles.modalDetails}
              >{`Horário: ${selectedEvent.horaInicial} - ${selectedEvent.horaFinal}`}</Text>
              <Text
                style={styles.modalDetails}
              >{`Local: ${selectedEvent.local.descricao}`}</Text>
              <Button
                style={{ margin: 5 }}
                title="Inscrever-se"
                onPress={() => alert("Inscrição realizada!")}
              />

              <Button
                style={{ margin: 5 }}
                title="Fechar"
                onPress={() => setModalVisible(false)}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  location: {
    fontSize: 12,
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default EventList;
