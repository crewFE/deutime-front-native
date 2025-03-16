import { useState } from "react";
import ApiService from "../api";

export const usePacoteEsporte = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEsportes = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/esportes");
      setData(response.data.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEsporteById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/esportes/${id}`);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createModalidade = async (esporte) => {
    setLoading(true);
    try {
      const response = await ApiService.post("/esportes", esporte);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    fetchEsportes,
    fetchEsporteById,
    createModalidade,
  };
};
