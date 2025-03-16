import React, { useEffect } from 'react';
import { usePacoteEvento } from "@/src/api/hooks/usePacoteEvento";

const TesteEvento = () => {
  const { eventos, error, loading, fetchEventoById } = usePacoteEvento();

  const eventoId = 2; // Defina o ID do evento que você deseja consultar

  useEffect(() => {
    // Chama a função para buscar um evento específico por ID
    console.log(`Tentando buscar evento com ID: ${eventoId}...`);
    fetchEventoById(eventoId);
  }, [eventoId]); // Dependência do eventoId, só será chamado quando o ID mudar

  useEffect(() => {
    // Verifica se o carregamento está acontecendo
    if (loading) {
      console.log('Carregando evento...');
    }
    // Se houver um erro, exibe-o no console
    if (error) {
      console.error('Erro ao carregar o evento:', error);
    }
  }, [loading, error]); // Apenas executa quando `loading` ou `error` mudarem.

  if (loading) {
    return <div>Carregando evento...</div>;
  }

  if (error) {
    return <div>Erro ao carregar o evento: {error.message}</div>;
  }

  return (
    <div>
      <h1>Evento</h1>
      {eventos && eventos.length > 0 ? (
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <strong>{evento.descricao}</strong> - {evento.dataEvento} ({evento.horaInicial} - {evento.horaFinal})
              <br />
              Local: {evento.local.descricao}
              <br />
              Esporte: {evento.esporte.nome}
              <br />
              Responsável: {evento.responsavel.nome} {evento.responsavel.sobrenome}
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <div>Evento não encontrado.</div>
      )}
    </div>
  );
};

export default TesteEvento;
