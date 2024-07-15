import React from "react";
import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, View, useColorScheme, Platform } from "react-native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import store, { persistor } from "./src/store";
import { Root } from "./src/screens/Root";

type ReducerInitialState = {
  store: boolean;
};

const initialState: ReducerInitialState = {
  store: false,
};

type ReducerAction = { type: "STORE" };

const reducer: React.Reducer<ReducerInitialState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "STORE":
      return { ...state, store: true };
    default:
      throw new Error();
  }
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const routeNameRef = React.useRef<string>();
  const navigationRef = useNavigationContainerRef();
  const scheme = useColorScheme();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [appearenceMode, setAppearenceMode] = React.useState(scheme);

  const onLayoutRootView = React.useCallback(async () => {
    if (state.store) {
      await SplashScreen.hideAsync();
    }
  }, [state]);

  React.useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(
        appearenceMode === "dark"
          ? NavigationDarkTheme.colors.card
          : NavigationLightTheme.colors.card
      );
      NavigationBar.setButtonStyleAsync(
        appearenceMode === "dark" ? "light" : "dark"
      );
      NavigationBar.setBorderColorAsync(
        appearenceMode === "dark"
          ? NavigationDarkTheme.colors.border
          : NavigationLightTheme.colors.border
      );
    }
  }, [appearenceMode]);

  const onStoreRehydrated = () => {
    setAppearenceMode(store.getState().configuration.appearenceMode || scheme);
    dispatch({ type: "STORE" });
  };

  React.useEffect(() => {
    const tearDown = store.subscribe(() => {
      // @ts-ignore
      if (store.getState()._persist.rehydrated) {
        onStoreRehydrated();
        tearDown();
      }
    });

    const tearDownScheme = store.subscribe(() => {
      setAppearenceMode(
        store.getState().configuration.appearenceMode || scheme
      );
    });

    // @ts-ignore
    if (store.getState()._persist.rehydrated) {
      onStoreRehydrated();
    }

    return () => {
      tearDown();
      tearDownScheme();
    };
  }, [scheme]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={
          appearenceMode === "dark" ? NavigationDarkTheme : NavigationLightTheme
        }
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            // Do something on route change
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        <PaperProvider
          theme={appearenceMode === "dark" ? PaperDarkTheme : PaperDefaultTheme}
        >
          <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {state.store && (
                <View
                  onLayout={onLayoutRootView}
                  style={[StyleSheet.absoluteFill]}
                >
                  <Root />
                </View>
              )}
            </PersistGate>
          </StoreProvider>
        </PaperProvider>
      </NavigationContainer>
      <StatusBar style={appearenceMode === "dark" ? "light" : "dark"} />
    </SafeAreaProvider>
  );
};

export default App;
