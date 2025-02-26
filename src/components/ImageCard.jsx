import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image, View } from "react-native";
import { Link, LinkText } from "@/components/ui/link";
import { Icon, ArrowRightIcon } from "@/components/ui/icon";

export function ImageCard({fotoURL, descricao}) {
  return (
    <Card className="flex h-full rounded-lg w-full m-2 shadow-md">
      <View className="w-full  aspect-square mb-3 rounded">
      <Image source={{uri: `${fotoURL}`}}
       style={{width: 200, height: 200, borderRadius: 2}} resizeMode="cover" />
       </View>

      <Heading size="lg" className="mb-2 line-clamp-2">
        {descricao}
      </Heading>
        <HStack className="items-center justify-end">
          <LinkText
            size="sm"
            className="font-semibold text-info-600 no-underline"
          >
            Ver Eventos
          </LinkText>
          <Icon
            as={ArrowRightIcon}
            size="sm"
            className="text-info-600 mt-0.5 ml-0.5"
          />
        </HStack>
    </Card>
  );
}
