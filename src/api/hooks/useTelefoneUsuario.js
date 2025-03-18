import { useState } from "react";
import ApiService from "../api";

export const useTelefoneUsuario = () => {
  const [telefones, setTelefones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchTelefones = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/telefones");
      setTelefones(response.data.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Testado, funcionando
  const fetchTelefoneById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/telefones/${id}`);
      setTelefones([response.data]); // Retorna um único telefone
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

    // Não testado
  const createTelefone = async (telefone) => {
    setLoading(true);
    try {
      const response = await ApiService.post("/telefones", telefone);
      setTelefones((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const updateTelefone = async (id, updatedTelefone) => {
    setLoading(true);
    try {
      const response = await ApiService.put(`/telefones/${id}`, updatedTelefone);
      setTelefones((prevData) =>
        prevData.map((telefone) => (telefone.id === id ? response.data : telefone))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const deleteTelefone = async (id) => {
    setLoading(true);
    try {
      await ApiService.delete(`/telefones/${id}`);
      setTelefones((prevData) => prevData.filter((telefone) => telefone.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    telefones,
    error,
    loading,
    fetchTelefones,
    fetchTelefoneById,
    createTelefone,
    updateTelefone,
    deleteTelefone,
  };
};
