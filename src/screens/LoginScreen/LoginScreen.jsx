import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Cadastro from "./Cadastro";
import { Provider } from "react-native-paper";
import useAuth from "@/src/api/hooks/auth/useAuth";
import GoogleLoginButton from '../../components/GoogleLoginButton';
import { jwtDecode } from 'jwt-decode';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const { loading, signIn, signInWithGoogle } = useAuth();

  const handleLogin = () => {
    if (email && password) {
      signIn(email, password, () => {
        navigation.replace("AppTabs");
      });
    } else {
      Alert.alert("Atenção", "Preencha email e senha");
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log("Login Google bem-sucedido:", response);
    
    await signInWithGoogle(response, () => {
      console.log("Navegando para AppTabs...");
      navigation.replace("AppTabs");
    });
  };  

  const handleGoogleError = (error) => {
    console.log("Erro no login Google:", error);
    Alert.alert("Erro", "Falha no login com Google");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.botaoPrimario} 
            onPress={handleLogin}
          >
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => setShowSignup(true)}
          >
            <Text style={styles.botaoSecundarioTexto}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showSignup} animationType="fade">
        <Provider>
          <Cadastro voltar={() => setShowSignup(false)} />
        </Provider>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001A6E",
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 150,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoPrimario: {
    backgroundColor: "#0051FF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  botaoSecundario: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botaoSecundarioTexto: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});