import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStack from "./HomeStack";
import Search from "../screens/Search/Search";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 10 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarIcon: ({ color, size }) => {
          let iconName =
            route.name === "Home"
              ? "home"
              : route.name === "Search"
              ? "magnify"
              : "account-circle";
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
