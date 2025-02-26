import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./styles";

function Search() {
  const handleSearch = () => {
    console.log("Clicoukk");
  };

  return (
    <View style={styles.container}>
      <Text className="text-white text-xl">Procure Eventos:</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          placeholderTextColor={"#6B6B6B"}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Search;
