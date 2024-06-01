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

// Tipo para navegação das rotas principais (abas)
export type RootTabNavigationProp = BottomTabNavigationProp<RootStackParamList>;

// Tipo para navegação das rotas do stack de perfil
export type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Perfil"
>;
