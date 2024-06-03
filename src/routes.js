import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Denuncias from "./screens/Denuncias";
import Perfil from "./screens/Perfil";
import Cuidados from "./screens/Cuidados";
import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContext from "./context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PerfilRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PerfilDetalhes" component={Perfil} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}

function Routes() {
  const { isLoggedIn } = useContext(AuthContext);

  const tratarBotaoDenuncias = (navigation) => {
    if (!isLoggedIn) {
      Alert.alert(
        "Faça login",
        "Você precisa fazer login para acessar as denúncias.",
        [
          { text: "Cancelar", onPress: () => navigation.navigate("Home") },
          { text: "OK", onPress: () => navigation.navigate("Perfil") },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#4B9AE9",
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let label;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              label = "Home";
              break;
            case "Denuncias":
              iconName = focused ? "megaphone" : "megaphone-outline";
              label = "Denúncias";
              break;
            case "Perfil":
              iconName = focused ? "person" : "person-outline";
              label = "Perfil";
              break;
            case "Cuidados":
              iconName = focused ? "heart" : "heart-outline";
              label = "Cuidados";
              break;
            default:
              iconName = "help";
              label = route.name;
          }
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: focused ? "#308DE9" : "transparent",
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
                position: "relative",
              }}
            >
              <Ionicons
                name={iconName}
                size={32}
                color={focused ? "#B9082C" : "#FFFFFF"}
              />
              <Text
                style={{
                  color: focused ? "#B9082C" : "#FFFFFF",
                  paddingTop: 3,
                }}
              >
                {label}
              </Text>
            </View>
          );
        },
        tabBarItemStyle: {
          backgroundColor: "#4B9AE9",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cuidados"
        component={Cuidados}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Denuncias"
        component={Denuncias}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              tratarBotaoDenuncias(navigation);
            }
          },
        })}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilRoutes}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default Routes;
