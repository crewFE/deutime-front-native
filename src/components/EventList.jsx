import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ApiService from "../api/api";
import { useEventoParticipantes } from "../api/hooks/useEventoParticipantes";
import EventDetailsModal from "./Modals/EventDetailsModal";

const EventList = ({ id, type, searchQuery, sportName }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { fetchParticipanteById } = useEventoParticipantes();
  const [participantesArray, setParticipantesArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = events.filter((event) =>
        event.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchQuery, events]);

  const fetchData = async () => {
    try {
      let endpoint = "";

      switch (type) {
        case "court":
          endpoint = `/eventos/local/id/${id}`;
          break;
        case "sport":
          endpoint = `/eventos/esporte/${sportName}`;
          break;
        case "geral":
          endpoint = `/eventos`;
          break;
        default:
          console.error("Tipo inválido:", type);
          return;
      }

      const { data } = await ApiService.get(endpoint);
      setEvents(data.content);
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
        data={filteredEvents}
        style={styles.flatlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <EventDetailsModal
        visible={modalVisible}
        event={selectedEvent}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    height: "100%",
    padding: 10,
    margin: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#ececec",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#001A6E",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
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
});

export default EventList;
