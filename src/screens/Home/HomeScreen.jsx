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

function HomeScreen() {
  const {data, loading, error, fetchModalidades} = usePacoteEsporte();
  const {locais, fetchLocais} = usePacoteLocal();
  const regioes = [
    {id:1, descricao: "Morumbi", fotoLocal: "https://www.h2foz.com.br/wp-content/uploads/2024/11/Morumbi-Foz-MarcosLabanca.jpg"},
    {id:2, descricao: "Jardim Universitário", fotoLocal: "https://th.bing.com/th/id/R.0326b6deb985e62f5d2c82529202c247?rik=GT%2bxZ8RWFVz43g&riu=http%3a%2f%2fagenciasn.com.br%2fwp-content%2fuploads%2f2017%2f07%2fUNILA-Unidade-Jardim-Universit%c3%a1rio-2-1024x661.jpg&ehk=KBjceVMqzvaERGySWScGAySMqb%2bKXren9DPzjIhkvJs%3d&risl=&pid=ImgRaw&r=0"},
    {id:3, descricao: "Jardim kkkk", fotoLocal: "https://th.bing.com/th/id/R.0326b6deb985e62f5d2c82529202c247?rik=GT%2bxZ8RWFVz43g&riu=http%3a%2f%2fagenciasn.com.br%2fwp-content%2fuploads%2f2017%2f07%2fUNILA-Unidade-Jardim-Universit%c3%a1rio-2-1024x661.jpg&ehk=KBjceVMqzvaERGySWScGAySMqb%2bKXren9DPzjIhkvJs%3d&risl=&pid=ImgRaw&r=0"},
    {id:4, descricao: "Jardim asd", fotoLocal: "https://th.bing.com/th/id/R.0326b6deb985e62f5d2c82529202c247?rik=GT%2bxZ8RWFVz43g&riu=http%3a%2f%2fagenciasn.com.br%2fwp-content%2fuploads%2f2017%2f07%2fUNILA-Unidade-Jardim-Universit%c3%a1rio-2-1024x661.jpg&ehk=KBjceVMqzvaERGySWScGAySMqb%2bKXren9DPzjIhkvJs%3d&risl=&pid=ImgRaw&r=0"},
 
 
  ]
 
  useEffect(() => {
    fetchModalidades();
    fetchLocais();
  }, []);

  if (loading) {
    return (
      <VStack>
        <Text>Carregando...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack>
        <Text>Erro ao carregar...</Text>
      </VStack>
    );
  }

  const modalidades = Array.isArray(data) ? data : [];
  const locaisArray = Array.isArray(locais) ? locais : [];

  return (
    <Box className="h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-full"
      >
        <VStack className="gap-4 p-2 pb-16">
          <Box>
            <Heading className="mb-2">Modalidades</Heading>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="max-w-full"
            >
              <HStack space="md" className="p-2">
                {modalidades.map(modalidade => (
                  <Text key={modalidade.id} className="border-2 px-3 py-2 bg-gray-100 rounded-lg">
                    {modalidade.nome}
                  </Text>
                ))}
              </HStack>
            </ScrollView>
          </Box>
         
          <Box>
            <Heading className="mb-2">Regiões</Heading>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="max-w-full"
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              <HStack space="md" className="pb-2">
                {regioes.map(regiao => (
                  <ImageCard
                    key={regiao.id}
                    descricao={regiao.descricao}
                    fotoURL={regiao.fotoLocal}
                  />
                ))}
              </HStack>
            </ScrollView>
          </Box>    

          <Box>
            <Heading className="mb-2">Praças Esportivas</Heading>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="max-w-full"
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              <HStack space="md" className="pb-2">
                {locaisArray.map(local => (
                  <ImageCard
                    key={local.id}
                    descricao={local.descricao}
                    fotoURL={local.fotoLocal}
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