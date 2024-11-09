import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import Home from "./Home";
import Order from "./Order";
import HomeStack from "./HomeStack";
import Header from "./Header";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Header />,
      }}
      tabBar={(props) => (
        <TabBar
          {...props}
          homeIcon={require("../assets/images/home.png")}
          plateIcon={require("../assets/images/plate.png")}
          profileIcon={require("../assets/images/profile.png")}
        />
      )}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Order" component={Order} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
