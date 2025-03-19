import React, { useState, useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ScrollView } from "react-native";
import { usePacoteEvento } from "@/src/api/hooks/usePacoteEvento";
import { useEventoParticipantes } from "@/src/api/hooks/useEventoParticipantes";
import { usePacoteEndereco } from "@/src/api/hooks/usePacoteEndereco";
import { usePacoteEmailUsuario } from "@/src/api/hooks/usePacoteEmailUsuario";
import { useTelefoneUsuario } from "@/src/api/hooks/useTelefoneUsuario";
import { styles } from "./styles";
import { Image, TouchableOpacity, View } from "react-native";

// Dados do usuário fixos para teste
const usuario = {
  id: 3,
  nome: "Cícero",
  sobrenome: "Neves",
  genero: "MASCULINO",
  fotoPerfil:
    "https://as2.ftcdn.net/v2/jpg/12/14/49/83/1000_F_1214498390_LmEZY3InP6vrZLmBVcspGOzemU6XfBmw.jpg",
  nroEndereco: "106",
  complemento: "CASA DOS FUNDOS",
};

function Profile() {
  const { eventos, fetchEventos } = usePacoteEvento();
  const { participantes, fetchParticipantes } = useEventoParticipantes();
  const { enderecos, fetchEnderecoById } = usePacoteEndereco();
  const { emails, fetchEmailById } = usePacoteEmailUsuario();
  const { telefones, fetchTelefoneById } = useTelefoneUsuario();
  const [eventosCriados, setEventosCriados] = useState([]);
  const [eventosParticipantes, setEventosParticipantes] = useState([]);

  // Busca todos os eventos, participantes, endereço, email e telefone ao carregar a tela
  useEffect(() => {
    fetchEventos();
    fetchParticipantes();
    fetchEnderecoById(usuario.id); // Buscar endereço com base no ID do usuário
    fetchEmailById(usuario.id); // Buscar email com base no ID do usuário
    fetchTelefoneById(usuario.id); // Buscar telefone com base no ID do usuário
  }, []);

  useEffect(() => {
    console.log("Eventos1:", eventos);
    console.log("Participantes1:", participantes);
    console.log("Endereços:", enderecos);
    console.log("Emails:", emails);
    console.log("Telefones:", telefones);
  }, [eventos, participantes, enderecos, emails, telefones]);

  // Filtra eventos criados e eventos em que o usuário participa
  useEffect(() => {
    if (eventos && participantes) {
      // Filtra eventos criados pelo usuário
      const eventosCriadosFiltrados = eventos.filter(
        (evento) => evento.responsavel?.id === usuario.id
      );
      setEventosCriados(eventosCriadosFiltrados);

      // Filtra eventos em que o usuário participa
      const eventosParticipantesFiltrados = participantes
        .filter((participante) => participante.usuario?.id === usuario.id)
        .map((participante) => participante.evento);
      setEventosParticipantes(eventosParticipantesFiltrados);
    }
  }, [eventos, participantes]);

  return (
    <Box style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <VStack className="gap-4 p-4">
          {/* Seção de perfil do usuário */}
          <Box className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm ">
            <Heading className="mb-2 text-2xl font-bold">
              Perfil do Usuário
            </Heading>
            <VStack className="flex items-center justify-center" space="sm">
              {usuario.fotoPerfil && (
                <>
                  <Image
                    source={{ uri: `${usuario.fotoPerfil}` }}
                    style={{
                      width: 200,
                      height: 200,
                      borderWidth: 5,
                      borderRadius: 100,
                      borderColor: "#001A6E",
                    }}
                    resizeMode="cover"
                  />
                </>
              )}
              <Text className="text-xl font-semibold">
                {usuario.nome} {usuario.sobrenome}
              </Text>
              <Text>Gênero: {usuario.genero}</Text>
            </VStack>
          </Box>

          {/* Seção de endereço do usuário */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">Endereço</Heading>
            {enderecos.length > 0 ? (
              <VStack space="sm">
                <Text>CEP: {enderecos[0]?.cep}</Text>
                <Text>
                  Logradouro: {enderecos[0]?.logradouro?.tipoLogradouro?.nome}{" "}
                  {enderecos[0]?.logradouro?.nome}
                </Text>
                <Text>Número: {usuario?.nroEndereco}</Text>{" "}
                {/* Acessando nroEndereco do objeto usuario */}
                <Text>Complemento: {usuario?.complemento}</Text>{" "}
                {/* Acessando complemento do objeto usuario */}
                <Text>Bairro: {enderecos[0]?.bairro?.nome}</Text>
                <Text>
                  Cidade: {enderecos[0]?.cidade?.nome},{" "}
                  {enderecos[0]?.cidade?.unidadeFederativa?.sigla}
                </Text>
              </VStack>
            ) : (
              <Text>Endereço não disponível.</Text>
            )}
          </Box>

          {/* Seção de emails do usuário */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">Emails</Heading>
            {emails.length > 0 ? (
              <Text>{emails[0]?.enderecoEmail}</Text>
            ) : (
              <Text>Email não disponível.</Text>
            )}
          </Box>

          {/* Seção de telefones do usuário */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">Telefones</Heading>
            {telefones.length > 0 ? (
              <Text>
                ({telefones[0]?.ddd?.codigoArea}) {telefones[0]?.nroTelefone}
              </Text>
            ) : (
              <Text>Telefone não disponível.</Text>
            )}
          </Box>

          {/* Seção de eventos em que o usuário participa */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">
              Eventos Participados / a Participar
            </Heading>
            {eventosParticipantes.length > 0 ? (
              eventosParticipantes.map((evento) => (
                <Box key={evento.id} className="p-2 border-b border-gray-200">
                  <Text className="font-semibold">{evento.descricao}</Text>
                  <Text>Data: {evento.dataEvento}</Text>
                  <Text>Local: {evento.local.descricao}</Text>
                  <Text>Esporte: {evento.esporte.nome}</Text>
                </Box>
              ))
            ) : (
              <Text>Nenhum evento encontrado.</Text>
            )}
          </Box>

          {/* Seção de eventos criados pelo usuário */}
          <Box className="bg-white p-4 rounded-lg shadow-sm">
            <Heading className="mb-2 text-lg font-bold">
              Eventos Criados
            </Heading>
            {eventosCriados.length > 0 ? (
              eventosCriados.map((evento) => (
                <Box key={evento.id} className="p-2 border-b border-gray-200">
                  <Text className="font-semibold">{evento.descricao}</Text>
                  <Text>Data: {evento.dataEvento}</Text>
                  <Text>Local: {evento.local.descricao}</Text>
                  <Text>Esporte: {evento.esporte.nome}</Text>
                </Box>
              ))
            ) : (
              <Text>Nenhum evento criado.</Text>
            )}
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default Profile;
