import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import AppTabs from "./src/navigation/AppTabs";
import AuthProvider from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
