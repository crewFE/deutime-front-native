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
import { ScrollView } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native";

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
      fotoLocal:
        "https://th.bing.com/th/id/R.0326b6deb985e62f5d2c82529202c247?rik=GT%2bxZ8RWFVz43g&riu=http%3a%2f%2fagenciasn.com.br%2fwp-content%2fuploads%2f2017%2f07%2fUNILA-Unidade-Jardim-Universit%c3%a1rio-2-1024x661.jpg&ehk=KBjceVMqzvaERGySWScGAySMqb%2bKXren9DPzjIhkvJs%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      descricao: "Jardim kkkk",
      fotoLocal:
        "https://th.bing.com/th/id/R.0326b6deb985e62f5d2c82529202c247?rik=GT%2bxZ8RWFVz43g&riu=http%3a%2f%2fagenciasn.com.br%2fwp-content%2fuploads%2f2017%2f07%2fUNILA-Unidade-Jardim-Universit%c3%a1rio-2-1024x661.jpg&ehk=KBjceVMqzvaERGySWScGAySMqb%2bKXren9DPzjIhkvJs%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 4,
      descricao: "Jardim asd",
      fotoLocal:
        "https://th.bing.com/th/id/R.0326b6deb985e62f5d2c82529202c247?rik=GT%2bxZ8RWFVz43g&riu=http%3a%2f%2fagenciasn.com.br%2fwp-content%2fuploads%2f2017%2f07%2fUNILA-Unidade-Jardim-Universit%c3%a1rio-2-1024x661.jpg&ehk=KBjceVMqzvaERGySWScGAySMqb%2bKXren9DPzjIhkvJs%3d&risl=&pid=ImgRaw&r=0",
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
              <HStack space="md">
                {modalidades.map((modalidade) => (
                  <Text style={styles.textCard} key={modalidade.id}>
                    {modalidade.nome}
                  </Text>
                ))}
              </HStack>
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
