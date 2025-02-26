import { useState } from 'react';
import ApiService from '../api';

export const usePacoteLocal = () => {
  const [locais, setLocais] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocais = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/locais');
      setLocais(response.data.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocalById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/locais/${id}`);
      setLocais(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createLocal = async (local) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/locais', local);
      setLocais((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateLocal = async (id, updatedLocal) => {
    setLoading(true);
    try {
      const response = await ApiService.put(`/locais/${id}`, updatedLocal);
      setLocais((prevData) =>
        prevData.map((local) =>
          local.id === id ? response.data : local
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteLocal = async (id) => {
    setLoading(true);
    try {
      await ApiService.delete(`/locais/${id}`);
      setLocais((prevData) => prevData.filter((local) => local.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    locais,
    error,
    loading,
    fetchLocais,
    fetchLocalById,
    createLocal,
    updateLocal,
    deleteLocal,
  };
};
