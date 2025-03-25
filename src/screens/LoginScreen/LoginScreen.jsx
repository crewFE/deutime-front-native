import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    // lógica fake apenas para testar navegação
    if (email && senha) {
      navigation.replace("AppTabs"); // substitui a tela de login
    } else {
      alert("Preencha email e senha");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#001A6E",
  },
  titulo: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#0051FF",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#888",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    marginTop: "10%",
    width: 300,
    height: 200,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});
