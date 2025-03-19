import { Text, TouchableOpacity, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./styles";
import { VStack } from "@/components/ui/vstack";
import EventList from "@/src/components/EventList";
import { useState } from "react";
import { Box } from "@/components/ui/box";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <VStack className="flex flex-col justify-items-center items-center p-4">
        <View style={styles.form}>
          <TextInput
            placeholder="Busque Eventos..."
            placeholderTextColor="#bbb"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Box className="w-[95vw] h-[100vh] m-2 border rounded-lg">
          <EventList id="0" type="geral" searchQuery={searchQuery} />
        </Box>
      </VStack>
    </View>
  );
}

export default Search;
