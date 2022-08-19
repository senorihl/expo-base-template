import * as React from "react";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings } from "./Settings";

export type RootTabParamList = {
  Settings: never;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const Root: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icons name="cog" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
