import { useState } from "react";
import ApiService from "../api";

export const usePacoteEsporte = () => {
  const [esportes, setEsportes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posicoes, setPosicoes] = useState([]);

  const fetchEsportes = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/esportes");
      setEsportes(response.data.content);
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
      setEsportes(response.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosicoesById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/posicoes/esporte/${id}`);
      setPosicoes(response.data);
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
      setEsportes(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    esportes,
    posicoes,
    error,
    loading,
    fetchEsportes,
    setEsportes,
    fetchEsporteById,
    fetchPosicoesById,
    createModalidade,
  };
};
