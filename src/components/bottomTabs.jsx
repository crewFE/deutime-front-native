import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewEvent from "../screens/NewEvent/NewEvent";
import HomeScreen from "../screens/Home/HomeScreen";
import Search from "../screens/Search/Search";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NewEvent" component={NewEvent} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
