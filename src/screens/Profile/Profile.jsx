import React, { useState, useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/src/components/ImageCard";
import { EventList } from "@/src/components/EventList";
import { ScrollView } from "react-native";
import { usePacoteUsuario } from "@/src/api/hooks/usePacoteUsuario";
import { usePacoteEndereco } from "@/src/api/hooks/usePacoteEndereco";
import { useTelefoneUsuario } from "@/src/api/hooks/useTelefoneUsuario";
import { usePacoteEmailUsuario } from "@/src/api/hooks/usePacoteEmailUsuario";
import { usePacoteEvento } from "@/src/api/hooks/usePacoteEvento";
import { useEventoParticipantes } from "@/src/api/hooks/useEventoParticipantes";

function Profile() {
  const [userIdInput, setUserIdInput] = useState("");

  const { usuario, loading: userLoading, error: userError, fetchUsuarioById } = usePacoteUsuario();
  const { enderecos, loading: enderecoLoading, error: enderecoError, fetchEnderecoById } = usePacoteEndereco();
  const { telefones, loading: telefoneLoading, error: telefoneError, fetchTelefoneById } = useTelefoneUsuario();
  const { emails, loading: emailLoading, error: emailError, fetchEmailById } = usePacoteEmailUsuario();
  const { eventos, loading: eventoLoading, error: eventoError, fetchEventos } = usePacoteEvento();
  const { participantes, loading: participanteLoading, error: participanteError, fetchParticipantes } = useEventoParticipantes();

  const isLoading = userLoading || enderecoLoading || telefoneLoading || emailLoading || eventoLoading || participanteLoading;
  const error = userError || enderecoError || telefoneError || emailError || eventoError || participanteError;

  const [eventosCriados, setEventosCriados] = useState([]);
  const [eventosParticipantes, setEventosParticipantes] = useState([]);

  // Busca inicial de dados
  useEffect(() => {
    fetchEventos();
    fetchParticipantes();
  }, []);

  // Atualiza eventos filtrados quando os dados mudam
  useEffect(() => {
    if (usuario && eventos?.content?.length > 0 && participantes?.content?.length > 0) {
      const eventosCriadosFiltrados = eventos.content.filter(
        evento => evento.responsavel?.id === usuario.id
      );
      
      const eventosParticipantesFiltrados = participantes.content
        .filter(participante => participante.usuario?.id === usuario.id)
        .map(participante => participante.evento);

      setEventosCriados(eventosCriadosFiltrados);
      setEventosParticipantes(eventosParticipantesFiltrados);
    }
  }, [usuario, eventos, participantes]);

  // Busca dados relacionados quando o usuário é carregado
  useEffect(() => {
    if (usuario?.id) {
      if (usuario.endereco?.id) fetchEnderecoById(usuario.endereco.id);
      if (usuario.telefonesIds) usuario.telefonesIds.forEach(fetchTelefoneById);
      if (usuario.emailsIds) usuario.emailsIds.forEach(fetchEmailById);
    }
  }, [usuario]);

  // Handler para busca de usuário
  const handleSearchUser = () => {
    if (userIdInput.trim()) {
      fetchUsuarioById(userIdInput.trim());
    }
  };

    // Tratamento de estados de carregamento e erro
    if (isLoading) {
      return (
        <VStack className="flex-1 justify-center items-center">
          <Text>Carregando dados...</Text>
        </VStack>
      );
    }

    if (error) {
      return (
        <VStack className="flex-1 justify-center items-center">
          <Text className="text-red-500">Erro: {error.message}</Text>
        </VStack>
      );
    }

  
  return (
    <Box className="h-full bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <VStack className="gap-4 p-4">
          {/* Seção de busca */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">Buscar Usuário</Heading>
            <HStack space="sm" className="items-center">
              <Input
                placeholder="Digite o ID do usuário"
                value={userIdInput}
                onChangeText={setUserIdInput}
                className="flex-1 border rounded p-2"
                keyboardType="numeric"
              />
              { <Button 
                onPress={handleSearchUser}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                <Text className="text-white">Buscar</Text>
              </Button> }
            </HStack>
          </Box>

          {/* Seção de perfil */}
          {usuario && (
            <Box className="bg-white p-4 rounded-lg shadow-sm">
              <Heading className="mb-2 text-lg font-bold">Perfil do Usuário</Heading>
              <VStack space="sm">
                {usuario.fotoPerfil && (
                  <ImageCard
                    fotoURL={usuario.fotoPerfil}
                    descricao={usuario.nome}
                    className="w-full h-48 rounded-lg"
                  />
                )}

                <Text className="font-semibold">Nome: {usuario.nome} {usuario.sobrenome}</Text>
                <Text>Gênero: {usuario.genero}</Text>

                {enderecos[0] && (
                  <Text>
                    Endereço: {enderecos[0].logradouro.tipoLogradouro.sigla} {enderecos[0].logradouro.nome}, 
                    {usuario.nroEndereco} - {enderecos[0].bairro.nome}, {enderecos[0].cidade.nome}/{enderecos[0].cidade.unidadeFederativa.sigla}
                  </Text>
                )}

                {telefones.length > 0 && (
                  <VStack>
                    <Text className="font-semibold">Telefones:</Text>
                    {telefones.map(telefone => (
                      <Text key={telefone.id}>
                        ({telefone.ddd.codigoArea}) {telefone.nroTelefone}
                      </Text>
                    ))}
                  </VStack>
                )}

                {emails.length > 0 && (
                  <VStack>
                    <Text className="font-semibold">Emails:</Text>
                    {emails.map(email => (
                      <Text key={email.id}>{email.enderecoEmail}</Text>
                    ))}
                  </VStack>
                )}
              </VStack>
            </Box>
          )}

          {/* Seção de eventos */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">Próximos Eventos</Heading>
            <EventList events={eventosParticipantes} />
          </Box>

          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">Eventos Criados</Heading>
            <EventList events={eventosCriados} />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );  
}

export default Profile;
