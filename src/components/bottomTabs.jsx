import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewEvent from "../screens/NewEvent/NewEvent";
import HomeScreen from "../screens/Home/HomeScreen";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NewEvent" component={NewEvent} />
    </Tab.Navigator>
  );
}
