import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const loadStorage = async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (token && userId) {
        setAuthData({ token, userId });
      }
    };

    loadStorage();
  }, []);

  const signIn = async ({ token, userId }) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", String(userId));
    setAuthData({ token, userId });
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
