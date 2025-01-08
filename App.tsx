import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./src/components/bottomTabs";

import HomeScreen from "./src/screens/Home/HomeScreen";
import NewEvent from "./src/screens/NewEvent/NewEvent";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
