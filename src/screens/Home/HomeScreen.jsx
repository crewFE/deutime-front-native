import React from "react";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { usePacoteEsporte } from "@/src/api/hooks/usePacoteEsporte";
import { usePacoteLocal } from "@/src/api/hooks/useLocais";
import { useEffect } from "react";
import { ImageCard } from "@/src/components/ImageCard";
import { ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native";
import TextCard from "@/src/components/TextCard";

function HomeScreen() {
  const { esportes, loading, fetchEsportes } = usePacoteEsporte();
  const { locais, fetchLocais } = usePacoteLocal();
  const regioes = [
    {
      id: 1,
      descricao: "Morumbi",
      fotoLocal:
        "https://www.h2foz.com.br/wp-content/uploads/2024/11/Morumbi-Foz-MarcosLabanca.jpg",
    },
    {
      id: 2,
      descricao: "Jardim Universitário",
      fotoLocal: "https://gdia.com.br/wp-content/uploads/2023/10/unila-1.jpg",
    },
    {
      id: 3,
      descricao: "Vila A",
      fotoLocal:
        "https://i1.wp.com/100fronteiras.com/wp-content/uploads/2020/08/obras-ctg-charrua-foz-foto-itaipu-e1597425477601.jpg?fit=800%2C534&ssl=1",
    },
  ];

  useEffect(() => {
    fetchEsportes();
    fetchLocais();
  }, []);

  if (loading) {
    return (
      <VStack>
        <Text>Carregando...</Text>
      </VStack>
    );
  }

  const modalidades = Array.isArray(esportes) ? esportes : [];
  const locaisArray = Array.isArray(locais) ? locais : [];

  return (
    <Box style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Box>
            <HStack className="flex items-center justify-center">
              <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 300, height: 200 }}
                resizeMode="contain"
              />
            </HStack>
            <Heading style={styles.titleHeader}>Modalidades</Heading>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {modalidades?.length > 0 ? (
                <HStack space="md">
                  {modalidades.map((modalidade) => (
                    <TextCard
                      key={modalidade.id}
                      id={modalidade.id}
                      descricao={modalidade.nome}
                      fotoURL={modalidade.imagem}
                      type={"sport"}
                      sportName={modalidade.nome}
                    />
                  ))}
                </HStack>
              ) : (
                <Text style={styles.emptyText}>
                  Nenhuma modalidade encontrada
                </Text>
              )}
            </ScrollView>
          </Box>

          <Box>
            <Heading style={styles.titleHeader}>Regiões</Heading>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              <HStack space="md">
                {regioes.map((regiao) => (
                  <ImageCard
                    key={regiao.id}
                    id={regiao.id}
                    descricao={regiao.descricao}
                    fotoURL={regiao.fotoLocal}
                    type="region"
                  />
                ))}
              </HStack>
            </ScrollView>
          </Box>

          <Box>
            <Heading style={styles.titleHeader}>Praças Esportivas</Heading>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              <HStack space="md">
                {locaisArray.map((local) => (
                  <ImageCard
                    key={local.id}
                    id={local.id}
                    descricao={local.descricao}
                    fotoURL={local.fotoLocal}
                    type="court"
                  />
                ))}
              </HStack>
            </ScrollView>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default HomeScreen;
