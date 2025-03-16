import { useState } from 'react';
import ApiService from '../api';

export const usePacoteEmailUsuario = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/emails');
      console.log('Responda da API:', response.data.content);  // Verificando o que a API retorna
      setEmails(response.data.content); // Ajustando para usar o "content" do JSON
    } catch (err) {
      console.error('Erro ao buscar emails:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Testado, funcionando
  const fetchEmailById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/emails/${id}`);
      setEmails([response.data]); // Ajustando para exibir apenas o email com ID específico
    } catch (err) {
      console.error('Erro ao buscar email por ID:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const createEmail = async (email) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/emails', email);
      setEmails((prevData) => [...prevData, response.data]);
    } catch (err) {
      console.error('Erro ao criar email:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

    // Não testado
  const updateEmail = async (id, updatedEmail) => {
    setLoading(true);
    try {
      const response = await ApiService.put(`/emails/${id}`, updatedEmail);
      setEmails((prevData) =>
        prevData.map((email) =>
          email.id === id ? response.data : email
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar email:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

    // Não testado
  const deleteEmail = async (id) => {
    setLoading(true);
    try {
      await ApiService.delete(`/emails/${id}`);
      setEmails((prevData) => prevData.filter((email) => email.id !== id));
    } catch (err) {
      console.error('Erro ao deletar email:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    emails,
    error,
    loading,
    fetchEmails,
    fetchEmailById,
    createEmail,
    updateEmail,
    deleteEmail,
  };
};
