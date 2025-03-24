import { useState } from "react";
import ApiService from "../api";

export const useEventoParticipantes = () => {
  const [participantes, setParticipantes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchParticipantes = async () => {
    setLoading(true);
    console.log("Iniciando busca de participantes...");
    try {
      const response = await ApiService.get("/eventoparticipantes");
      console.log("Participantes recebidos:", response.data);
      setParticipantes(response.data.content);
    } catch (err) {
      console.error("Erro ao buscar participantes:", err);
      setError(err);
    } finally {
      console.log("Busca de participantes finalizada.");
      setLoading(false);
    }
  };

  // Testado, funcionando -- Hugo: alterado para puxar participantes do evento 'id'
  const fetchParticipanteById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(
        `/eventoparticipantes/evento/${id}`
      );
      setParticipantes([response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const createParticipante = async (participante) => {
    setLoading(true);
    try {
      const response = await ApiService.post(
        "/eventoparticipantes",
        participante
      );
      setParticipantes((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const updateParticipante = async (id, updatedParticipante) => {
    setLoading(true);
    try {
      const response = await ApiService.put(
        `/eventoparticipantes/${id}`,
        updatedParticipante
      );
      setParticipantes((prevData) =>
        prevData.map((participante) =>
          participante.id === id ? response.data : participante
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const deleteParticipante = async (id) => {
    setLoading(true);
    try {
      await ApiService.delete(`/eventoparticipantes/${id}`);
      setParticipantes((prevData) =>
        prevData.filter((participante) => participante.id !== id)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    participantes,
    error,
    loading,
    fetchParticipantes,
    fetchParticipanteById,
    createParticipante,
    updateParticipante,
    deleteParticipante,
  };
};
