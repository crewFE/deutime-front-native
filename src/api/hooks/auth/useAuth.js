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
  };
}
