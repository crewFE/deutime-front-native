import React from "react";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { ImageCard } from "@/src/components/ImageCard";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { usePacoteEsporte } from "@/src/api/hooks/usePacoteEsporte";
import { useEffect } from "react";

function HomeScreen() {
  const {data, loading, error, fetchModalidades} = usePacoteEsporte();
  
  useEffect(() => {
    fetchModalidades();
  }, []);

  if (loading) {
    return (
      <VStack>
        <Heading>Modalidades</Heading>
        <p>Carregando...</p>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack>
        <Heading>Modalidades</Heading>
        <p>Erro ao carregar modalidades</p>
      </VStack>
    );
  }

  const modalidades = Array.isArray(data) ? data : [];

  return (
    <VStack>
      <Heading>Modalidades</Heading>
      <Box className="max-w-full overflow-x-scroll">
        <HStack space="md">
          {modalidades.map(modalidade => (
            <p key={modalidade.id}>{modalidade.nome}</p>
          ))}
        </HStack>
      </Box>
    </VStack>
  );
}

export default HomeScreen;
