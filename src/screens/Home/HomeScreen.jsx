import React from "react";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { ImageCard } from "@/src/components/ImageCard";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";

function HomeScreen() {
  return (
    <VStack>
      <Heading>Modalidades</Heading>

      <Heading>Espaços</Heading>
      <Box className="max-w-full overflow-x-scroll">
        <HStack space="md">
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </HStack>
      </Box>
      <Heading>Regiões</Heading>
      <Box className="max-w-full overflow-x-scroll">
        <HStack space="sm">
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </HStack>
      </Box>
    </VStack>
  );
}

export default HomeScreen;
