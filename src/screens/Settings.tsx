import React from "react";
import { ScrollView } from "react-native";
import { List, Paragraph } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { saveAppearenceMode } from "../store/reducers/configuration";

export const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const appearenceMode = useAppSelector(
    (state) => state.configuration.appearenceMode
  );
  return (
    <ScrollView style={{ flex: 1 }}>
      <List.Section title="Preferences">
        <List.Item
          title="Dark mode"
          onPress={() => {
            const currIndex = ["dark", "light"].indexOf(appearenceMode || "");
            switch (currIndex) {
              case 0:
                dispatch(saveAppearenceMode("light"));
                break;
              case 1:
                dispatch(saveAppearenceMode());
                break;
              default:
                dispatch(saveAppearenceMode("dark"));
            }
          }}
          right={(props) => (
            <Paragraph
              {...props}
              style={{ flex: 1, alignSelf: "flex-end", textAlign: "right" }}
            >
              {appearenceMode === "dark"
                ? "On"
                : appearenceMode === "light"
                ? "Off"
                : "Automatic"}
            </Paragraph>
          )}
        />
      </List.Section>
    </ScrollView>
  );
};
