import { useState } from 'react';
import ApiService from '../api';

export const usePacoteEvento = () => {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchEventos = async () => {
    setLoading(true);
    console.log('Iniciando busca de eventos...');
    try {
      const response = await ApiService.get('/eventos');
      console.log('Eventos recebidos:', response.data);
      setEventos(response.data.content);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setError(err);
    } finally {
      setLoading(false);
      console.log('Busca de eventos finalizada.');
    }
  };

  // Testado, funcionando
  const fetchEventoById = async (id) => {
    setLoading(true);
    console.log(`Buscando evento com ID: ${id}...`);
    try {
      const response = await ApiService.get(`/eventos/${id}`);
      console.log('Evento recebido:', response.data);
      setEventos([response.data]);
    } catch (err) {
      console.error(`Erro ao buscar evento com ID ${id}:`, err);
      setError(err);
    } finally {
      setLoading(false);
      console.log(`Busca de evento com ID ${id} finalizada.`);
    }
  };

  // Não testado
  const createEvento = async (evento) => {
    setLoading(true);
    console.log('Criando novo evento:', evento);
    try {
      const response = await ApiService.post('/eventos', evento);
      console.log('Evento criado com sucesso:', response.data);
      setEventos((prevData) => [...prevData, response.data]);
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      setError(err);
    } finally {
      setLoading(false);
      console.log('Cadastro de evento finalizado.');
    }
  };

  // Não testado
  const updateEvento = async (id, updatedEvento) => {
    setLoading(true);
    console.log(`Atualizando evento com ID ${id}:`, updatedEvento);
    try {
      const response = await ApiService.put(`/eventos/${id}`, updatedEvento);
      console.log('Evento atualizado com sucesso:', response.data);
      setEventos((prevData) =>
        prevData.map((evento) =>
          evento.id === id ? response.data : evento
        )
      );
    } catch (err) {
      console.error(`Erro ao atualizar evento com ID ${id}:`, err);
      setError(err);
    } finally {
      setLoading(false);
      console.log(`Atualização de evento com ID ${id} finalizada.`);
    }
  };

  // Não testado
  const deleteEvento = async (id) => {
    setLoading(true);
    console.log(`Deletando evento com ID: ${id}...`);
    try {
      await ApiService.delete(`/eventos/${id}`);
      console.log(`Evento com ID ${id} deletado com sucesso.`);
      setEventos((prevData) => prevData.filter((evento) => evento.id !== id));
    } catch (err) {
      console.error(`Erro ao deletar evento com ID ${id}:`, err);
      setError(err);
    } finally {
      setLoading(false);
      console.log(`Deleção de evento com ID ${id} finalizada.`);
    }
  };

  return {
    eventos,
    error,
    loading,
    fetchEventos,
    fetchEventoById,
    createEvento,
    updateEvento,
    deleteEvento
  };
};
