import { useState } from 'react';
import ApiService from '../api';

export const usePacoteUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Testado, funcionando
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get('/usuarios');
      setUsuarios(response.data.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Testado, funcionando
  const fetchUsuarioById = async (id) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/usuarios/${id}`);
      setUsuario(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const createUsuario = async (usuarioData) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/usuarios', usuarioData);
      setUsuarios((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const updateUsuario = async (id, updatedUsuario) => {
    setLoading(true);
    try {
      const response = await ApiService.put(`/usuarios/${id}`, updatedUsuario);
      setUsuarios((prevData) =>
        prevData.map((usuario) =>
          usuario.id === id ? response.data : usuario
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Não testado
  const deleteUsuario = async (id) => {
    setLoading(true);
    try {
      await ApiService.delete(`/usuarios/${id}`);
      setUsuarios((prevData) => prevData.filter((usuario) => usuario.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    usuarios,
    usuario,
    error,
    loading,
    fetchUsuarios,
    fetchUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  };
};
