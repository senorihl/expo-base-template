import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootTabParamList } from '../screens/Root';
import type { AppState, AppDispatch } from './';

export const useAppNavigation = () => useNavigation<NavigationProp<RootTabParamList>>();
export const useAppRoute = () => useRoute<RouteProp<RootTabParamList>>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppColorScheme = () => {
  const scheme = useColorScheme();
  const appearenceMode = useAppSelector((state) => state.configuration.appearenceMode || scheme);
  return appearenceMode;
};
