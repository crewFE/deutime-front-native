import { useState } from 'react';
import ApiService from '../api'; 

export const usePacoteEsporte = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchModalidades = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/modalidades');
      setData(response.data.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchModalidadeById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/modalidades/${id}`);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createModalidade = async (modalidade) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/modalidades', modalidade);
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
    fetchModalidades,
    fetchModalidadeById,
    createModalidade,
  };
};
