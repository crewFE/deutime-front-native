import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import AppTabs from "./src/navigation/AppTabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
