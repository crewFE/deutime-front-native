import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { usePacoteEvento } from "@/src/api/hooks/usePacoteEvento";
import { useEventoParticipantes } from "@/src/api/hooks/useEventoParticipantes";
import { usePacoteEndereco } from "@/src/api/hooks/usePacoteEndereco";
import { usePacoteEmailUsuario } from "@/src/api/hooks/usePacoteEmailUsuario";
import { useTelefoneUsuario } from "@/src/api/hooks/useTelefoneUsuario";
import { usePacoteUsuario } from "@/src/api/hooks/usePacoteUsuario";
import { AuthContext } from "@/src/context/AuthContext";

function Profile() {
  const { authData } = useContext(AuthContext);
  const { eventos, fetchEventos } = usePacoteEvento();
  const { participantes, fetchParticipantes } = useEventoParticipantes();
  const { enderecos, fetchEnderecoById } = usePacoteEndereco();
  const { emails, fetchEmailById } = usePacoteEmailUsuario();
  const { telefones, fetchTelefoneById } = useTelefoneUsuario();
  const { usuario, fetchUsuarioById } = usePacoteUsuario();
  const [eventosCriados, setEventosCriados] = useState([]);
  const [eventosParticipantes, setEventosParticipantes] = useState([]);

  // Busca todos os eventos, participantes, endereço, email e telefone ao carregar a tela
  useEffect(() => {
    fetchUsuarioById(authData?.userId);
    fetchEnderecoById(authData?.userId);
    fetchEmailById(authData?.userId);
    fetchTelefoneById(authData?.userId);
    console.log(usuario);
  }, []);

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
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainSection}>
          <Text style={styles.title}>Perfil do Usuário</Text>
          {usuario && (
            <View style={styles.centered}>
              <Image
                source={{
                  uri:
                    usuario?.fotoPerfil &&
                    usuario.fotoPerfil.toLowerCase() !== "n/a"
                      ? usuario.fotoPerfil
                      : "https://i.imgur.com/1f3nK2Z.png", // imagem padrão
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.name}>
                {usuario?.nome || ""} {usuario?.sobrenome || ""}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Endereço</Text>
          {enderecos.length > 0 ? (
            <>
              <Text>CEP: {enderecos[0]?.cep}</Text>
              <Text>
                Logradouro: {enderecos[0]?.logradouro?.tipoLogradouro?.nome}{" "}
                {enderecos[0]?.logradouro?.nome}
              </Text>
              <Text>Número: {usuario.nroEndereco}</Text>
              <Text>Complemento: {usuario.complemento}</Text>
              <Text>Bairro: {enderecos[0]?.bairro?.nome}</Text>
              <Text>
                Cidade: {enderecos[0]?.cidade?.nome},{" "}
                {enderecos[0]?.cidade?.unidadeFederativa?.sigla}
              </Text>
            </>
          ) : (
            <Text>Endereço não disponível.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Email</Text>
          {emails.length > 0 ? (
            <Text>{emails[0]?.enderecoEmail}</Text>
          ) : (
            <Text>Email não disponível.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Telefone</Text>
          {telefones.length > 0 ? (
            <Text>
              ({telefones[0]?.ddd?.codigoArea}) {telefones[0]?.nroTelefone}
            </Text>
          ) : (
            <Text>Telefone não disponível.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>
            Eventos Participados / a Participar
          </Text>
          {eventosParticipantes.length > 0 ? (
            eventosParticipantes.map((evento) => (
              <View key={evento.id} style={styles.eventBox}>
                <Text style={styles.eventTitle}>{evento.descricao}</Text>
                <Text>Data: {evento.dataEvento}</Text>
                <Text>Local: {evento.local.descricao}</Text>
                <Text>Esporte: {evento.esporte.nome}</Text>
              </View>
            ))
          ) : (
            <Text>Nenhum evento encontrado.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Eventos Criados</Text>
          {eventosCriados.length > 0 ? (
            eventosCriados.map((evento) => (
              <View key={evento.id} style={styles.eventBox}>
                <Text style={styles.eventTitle}>{evento.descricao}</Text>
                <Text>Data: {evento.dataEvento}</Text>
                <Text>Local: {evento.local.descricao}</Text>
                <Text>Esporte: {evento.esporte.nome}</Text>
              </View>
            ))
          ) : (
            <Text>Nenhum evento criado.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#001A6E",
    paddingHorizontal: 16,
  },
  mainSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: "12%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#001A6E",
  },
  eventBox: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
