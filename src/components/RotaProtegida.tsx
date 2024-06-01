import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext"; 
import { useNavigation } from "@react-navigation/native";
import { RootTabNavigationProp } from "../types/NavigationTypes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const RotaProtegida: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigation = useNavigation<RootTabNavigationProp>();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    navigation.navigate("Login");
    return null;
  }

  return <>{children}</>;
};

export default RotaProtegida;
