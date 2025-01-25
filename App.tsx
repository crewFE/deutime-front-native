import * as React from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./src/components/bottomTabs";

export default function App() {
  return (
    <GluestackUIProvider mode="light"><NavigationContainer>
        <MyTabs />
      </NavigationContainer></GluestackUIProvider>
  );
}
