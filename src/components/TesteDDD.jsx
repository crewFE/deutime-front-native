import React, { useEffect, useState } from 'react';
import { usePacoteEvento } from "@/src/api/hooks/usePacoteEvento";

const TesteAvaliacoes = () => {
  const [eventoId, setEventoId] = useState(1); // Exemplo de ID fixo (ajustável conforme necessário)
  const {
    avaliacoes = [],  // Garantindo que avaliacoes seja um array vazio por padrão
    fetchAvaliacoesByEventoId,  // Função para buscar avaliações pelo ID do evento
    loading,
    error
  } = usePacoteEvento();

  // Controle de carregamento das avaliações
  const [avaliacoesCarregadas, setAvaliacoesCarregadas] = useState(false);

  // Função para buscar as avaliações do evento
  const fetchAvaliacoes = async (idEvento) => {
    try {
      console.log(`Buscando avaliações para o evento com ID: ${idEvento}`);
      const response = await fetchAvaliacoesByEventoId(idEvento);  // Chama a função para buscar as avaliações
      if (response.data && Array.isArray(response.data.content)) {
        setAvaliacoes(response.data.content);  // Atualiza as avaliações no estado
      } else {
        console.error("Resposta da API inesperada:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  // Efeito para carregar avaliações ao carregar o componente
  useEffect(() => {
    if (eventoId && !avaliacoesCarregadas && !loading) {
      fetchAvaliacoes(eventoId);  // Chama a função de busca ao carregar
      setAvaliacoesCarregadas(true);  // Marca que as avaliações foram carregadas
    }
  }, [eventoId, loading, avaliacoesCarregadas]);

  // Efeito para verificar e logar as avaliações carregadas
  useEffect(() => {
    if (avaliacoes && Array.isArray(avaliacoes)) {
      console.log("Avaliações carregadas:", avaliacoes);
    }
  }, [avaliacoes]);

  if (loading) return <div>Carregando avaliações...</div>;
  if (error) return <div>Erro ao carregar avaliações: {error.message}</div>;

  return (
    <div>
      <h2>Avaliações para o evento {eventoId}</h2>
      {avaliacoes.length > 0 ? (
        <ul>
          {avaliacoes.map((avaliacao) => (
            <li key={avaliacao.id}>
              <h3>Evento: {avaliacao.eventoParticipante.evento.descricao}</h3>
              <p>Comentário: {avaliacao.comentario}</p>
              <p>Nota: {avaliacao.nota}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há avaliações disponíveis para este evento.</p>
      )}
    </div>
  );
};

export default TesteAvaliacoes;
