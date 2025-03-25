import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Cadastro({ voltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    Alert.alert("Cadastro", `Usuário ${nome} cadastrado com sucesso!`);
    voltar();
  };

  return (
    <View>
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
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
      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={voltar}>
        <Text style={styles.link}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
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
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#fff",
    marginTop: 16,
    textAlign: "center",
  },
});
