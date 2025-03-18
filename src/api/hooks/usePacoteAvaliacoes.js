import { useState } from 'react';
import ApiService from '../api';

export const usePacoteAvaliacoes = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchAvaliacoes = async () => {
    setLoading(true);
    console.log('Iniciando busca de avaliações...');
    try {
      const response = await ApiService.get('/avaliacoes');
      console.log('Avaliações recebidas:', response.data);
      setAvaliacoes(response.data.content);
    } catch (err) {
      console.error('Erro ao buscar avaliações:', err);
      setError(err);
    } finally {
      setLoading(false);
      console.log('Busca de avaliações finalizada.');
    }
  };

  // Testado, funcionando
  const fetchAvaliacaoById = async (id) => {
    setLoading(true);
    console.log(`Buscando avaliação com ID: ${id}...`);
    try {
      const response = await ApiService.get(`/avaliacoes/${id}`);
      console.log('Avaliação recebida:', response.data);
      setAvaliacoes([response.data]);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.error(`Timeout ao buscar avaliação com ID ${id}:`, err);
        setError({ message: 'A requisição demorou muito. Tente novamente.' });
      } else {
        console.error(`Erro ao buscar avaliação com ID ${id}:`, err);
        setError(err);
      }
    } finally {
      setLoading(false);
      console.log(`Busca de avaliação com ID ${id} finalizada.`);
    }
  };

  // Não testado
  const fetchAvaliacoesByEventoId = async (idEvento) => {
    setLoading(true);
    console.log(`Buscando avaliações para o evento com ID: ${idEvento}...`);
    try {
      const response = await ApiService.get(`/avaliacao/evento/${idEvento}`);
      console.log('Avaliações do evento recebidas:', response.data.content);
      setAvaliacoes(response.data.content); // Atualiza o estado apenas se a requisição for bem-sucedida
    } catch (err) {
      console.error(`Erro ao buscar avaliações para o evento com ID ${idEvento}:`, err);
      setError(err);
      setAvaliacoes([]); // Limpa o estado em caso de erro
    } finally {
      setLoading(false);
      console.log(`Busca de avaliações para o evento com ID ${idEvento} finalizada.`);
    }
  };

  // Não testado
  const createAvaliacao = async (avaliacao) => {
    setLoading(true);
    console.log('Criando nova avaliação:', avaliacao);
    try {
      const response = await ApiService.post('/avaliacoes', avaliacao);
      console.log('Avaliação criada com sucesso:', response.data);
      setAvaliacoes((prevData) => [...prevData, response.data]);
    } catch (err) {
      console.error('Erro ao criar avaliação:', err);
      setError(err);
    } finally {
      setLoading(false);
      console.log('Cadastro de avaliação finalizado.');
    }
  };

  // Não testado
  const updateAvaliacao = async (id, updatedAvaliacao) => {
    setLoading(true);
    console.log(`Atualizando avaliação com ID ${id}:`, updatedAvaliacao);
    try {
      const response = await ApiService.put(`/avaliacoes/${id}`, updatedAvaliacao);
      console.log('Avaliação atualizada com sucesso:', response.data);
      setAvaliacoes((prevData) =>
        prevData.map((avaliacao) =>
          avaliacao.id === id ? response.data : avaliacao
        )
      );
    } catch (err) {
      console.error(`Erro ao atualizar avaliação com ID ${id}:`, err);
      setError(err);
    } finally {
      setLoading(false);
      console.log(`Atualização de avaliação com ID ${id} finalizada.`);
    }
  };

  // Não testado
  const deleteAvaliacao = async (id) => {
    setLoading(true);
    console.log(`Deletando avaliação com ID: ${id}...`);
    try {
      await ApiService.delete(`/avaliacoes/${id}`);
      console.log(`Avaliação com ID ${id} deletada com sucesso.`);
      setAvaliacoes((prevData) => prevData.filter((avaliacao) => avaliacao.id !== id));
    } catch (err) {
      console.error('Erro ao deletar avaliação:', err);
      setError(err);
    } finally {
      setLoading(false);
      console.log('Deleção de avaliação finalizada.');
    }
  };

  return {
    avaliacoes,
    error,
    loading,
    fetchAvaliacoes,
    fetchAvaliacaoById,
    fetchAvaliacoesByEventoId,
    createAvaliacao,
    updateAvaliacao,
    deleteAvaliacao
  };
};