import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Home: undefined;
  Cuidados: undefined;
  Denuncias: undefined;
  Perfil: undefined;
  Login: undefined;
  Cadastro: undefined;
};

export type RootTabNavigationProp = BottomTabNavigationProp<RootStackParamList>;

export type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Perfil"
>;
