import * as React from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewEvent from "./src/screens/NewEvent/NewEvent";
import Search from "./src/screens/Search/Search";
import Profile from "./src/screens/Profile/Profile";
import HomeStack from "./src/navigation/HomeStack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              borderTopWidth: 0,
              height: 60,
              paddingBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "bold",
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Search") {
                iconName = "magnify";
              } else if (route.name === "Profile") {
                iconName = "account-circle";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
