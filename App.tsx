import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import AppTabs from "./src/navigation/AppTabs";
import AuthProvider from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();
const CLIENT_ID = "1083971739528-kqgtb21msr9foaa4momooqg03akus321.apps.googleusercontent.com";

export default function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="AppTabs" component={AppTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
