import { useContext, useState } from "react";
import { Alert } from "react-native";
import ApiService from "../../api";
import { AuthContext } from "@/src/context/AuthContext";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const { signIn: setAuthContextData } = useContext(AuthContext);

  const signUp = async (userData, onSuccess) => {
    console.log("New user Data:", userData);
    try {
      setLoading(true);
      const response = await ApiService.post("/auth/register", userData);

      if (response.status === 200) {
        Alert.alert("Success", "User registered successfully!");
        onSuccess?.();
      } else {
        Alert.alert("Error", "Registration failed.");
      }
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert("Error", "Internal server error.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (googleData, onSuccess) => {
    console.log("Google data received:", googleData);
  
    const fullName = googleData.name;
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    const email = googleData.email;
    const defaultPassword = googleData.sub;
    const fotoPerfil = googleData.picture || "N/A";
  
    const userData = {
      usuario: {
        nome: firstName,
        sobrenome: lastName,
        genero: "FEMININO",
        fotoPerfil: fotoPerfil,
        nroEndereco: "1",
        complemento: "N/A",
      },
      email: {
        enderecoEmail: email,
      },
      senha: defaultPassword,
    };
  
    console.log("User data to be registered:", userData);
  
    try {
      console.log("Attempting user registration...");
      await signUp(userData);
      console.log("User registered successfully. Proceeding to login...");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === "Conta já existe") {
        console.log("Account already exists. Proceeding to login...");
      } else {
        console.error("Unexpected error during sign-up:", error);
        return;
      }
    }
  
    console.log("Attempting to log in...");
    try {
      await signIn(email, defaultPassword, (authData) => {
        console.log("Login successful. Updating session...");
        setAuthContextData(authData);
        onSuccess?.(); // Chamando o callback após login bem-sucedido
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signIn = async (email, password, onSuccess) => {
    if (!email || !password) {
      Alert.alert("Warning", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.post("/auth/login", {
        email,
        senha: password,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;
        await setAuthContextData({ token, userId });
        onSuccess?.({ token, userId });
      } else if (response.status === 401) {
        Alert.alert("Unauthorized", "Incorrect email or password.");
      } else {
        Alert.alert("Error", "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(error);

      if (error.response?.status === 401) {
        Alert.alert("Unauthorized", "Incorrect email or password.");
      } else {
        Alert.alert("Error", "Server error. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signUp,
    signIn,
    signInWithGoogle
  };
}
