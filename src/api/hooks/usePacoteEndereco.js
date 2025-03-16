import { useState } from 'react';
import ApiService from '../api';

export const usePacoteEndereco = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchEnderecos = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/enderecos');
      setEnderecos(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Testado, funcionando
  const fetchEnderecoById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/enderecos/${id}`);
      setEnderecos([response.data]); // Atualiza com o endereço específico
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const createEndereco = async (endereco) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/enderecos', endereco);
      setEnderecos((prevData) => [...prevData, response.data]); // Adiciona o novo endereço
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const updateEndereco = async (id, novoCep) => {
    setLoading(true);
    try {
      const response = await ApiService.put(`/enderecos/${id}/cep`, { novoCep });
      setEnderecos((prevData) =>
        prevData.map((endereco) =>
          endereco.id === id ? response.data : endereco
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const deleteEndereco = async (id) => {
    setLoading(true);
    try {
      await ApiService.delete(`/enderecos/${id}`);
      setEnderecos((prevData) => prevData.filter((endereco) => endereco.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    enderecos,
    error,
    loading,
    fetchEnderecos,
    fetchEnderecoById,
    createEndereco,
    updateEndereco,
    deleteEndereco,
  };
};
