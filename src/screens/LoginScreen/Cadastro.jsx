import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Menu } from "react-native-paper";
import { ActivityIndicator } from "react-native";
import useAuth from "@/src/api/hooks/auth/useAuth";
import { LinearGradient } from "expo-linear-gradient";

export default function Cadastro({ voltar }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { loading, signUp } = useAuth();
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [newUser, setNewUser] = useState({
    usuario: {
      nome: "",
      sobrenome: "",
      genero: "",
      fotoPerfil: "N/A",
      nroEndereco: "1",
      complemento: "N/A",
    },
    email: {
      enderecoEmail: "",
    },
    senha: {
      senha: "",
    },
  });

  const handleCreateUser = async () => {
    if (
      !newUser.usuario.nome ||
      !newUser.usuario.sobrenome ||
      !newUser.usuario.genero ||
      !newUser.email.enderecoEmail ||
      !newUser.senha.senha
    ) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    signUp(newUser, () => {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      voltar();
    });
  };

  return (
    <LinearGradient
      colors={["#2596be", "#001A6E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}

          <Text style={styles.titulo}>CADASTRO</Text>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={newUser.usuario.nome}
            onChangeText={(text) =>
              setNewUser({
                ...newUser,
                usuario: { ...newUser.usuario, nome: text },
              })
            }
          />
          <TextInput
            placeholder="Sobrenome"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={newUser.usuario.sobrenome}
            onChangeText={(text) =>
              setNewUser({
                ...newUser,
                usuario: { ...newUser.usuario, sobrenome: text },
              })
            }
          />

          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity style={styles.selectButton} onPress={openMenu}>
                <Text style={styles.selectButtonText}>
                  {newUser.usuario.genero || "Selecionar gênero"}
                </Text>
              </TouchableOpacity>
            }
            contentStyle={styles.menuContent}
          >
            <Menu.Item
              onPress={() => {
                setNewUser({
                  ...newUser,
                  usuario: { ...newUser.usuario, genero: "Masculino" },
                });
                closeMenu();
              }}
              title="Masculino"
            />
            <Menu.Item
              onPress={() => {
                setNewUser({
                  ...newUser,
                  usuario: { ...newUser.usuario, genero: "Feminino" },
                });
                closeMenu();
              }}
              title="Feminino"
            />
          </Menu>

          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            value={newUser.email.enderecoEmail}
            onChangeText={(text) =>
              setNewUser({ ...newUser, email: { enderecoEmail: text } })
            }
          />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            placeholderTextColor="#bbb"
            secureTextEntry
            value={newUser.senha.senha}
            onChangeText={(text) =>
              setNewUser({ ...newUser, senha: { senha: text } })
            }
          />

          <View style={{ flexDirection: "row-reverse", gap: 2 }}>
            <TouchableOpacity style={styles.botao} onPress={handleCreateUser}>
              <Text style={styles.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
              <Text style={styles.botaoTexto}>Retornar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
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
    borderColor: "#444",
    width: "70%",
  },
  botaoVoltar: {
    backgroundColor: "#ce0505",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#444",
    width: "30%",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    marginBottom: 6,
    marginTop: 10,
  },
  selectButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  selectButtonText: {
    color: "#bbb",
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
