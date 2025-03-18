import * as React from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewEvent from "./src/screens/NewEvent/NewEvent";
import Search from "./src/screens/Search/Search";
import Profile from "./src/screens/Profile/Profile";
import HomeStack from "./src/navigation/HomeStack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeStack} />
          {/* <Tab.Screen name="NewEvent" component={NewEvent} /> */}
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Profile" component={Profile} />          
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
