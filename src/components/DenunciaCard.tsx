import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DenunciaCardProps } from "../types/DenunciaTypes";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "solucionada":
      return {
        backgroundColor: "#DFF2BF",
        color: "#4F8A10",
      };
    case "em análise":
      return {
        backgroundColor: "#BDE5F8",
        color: "#00529B",
      };
    case "negada":
      return {
        backgroundColor: "#FFBABA",
        color: "#D8000C",
      };
    case "em andamento":
      return {
        backgroundColor: "#FEEFB3",
        color: "#9F6000",
      };
    default:
      return {
        backgroundColor: "#FFFFFF",
        color: "#000000",
      };
  }
};

const DenunciaCard: React.FC<DenunciaCardProps> = ({ denuncia }) => {
  const statusStyle = getStatusStyle(denuncia.status);

  return (
    <View style={styles.denunciasCard}>
      <View style={{ maxWidth: 150, rowGap: 5 }}>
        <Text style={{ fontSize: 14, fontWeight: "700" }}>{denuncia.endereco}</Text>
        <Text style={{ color: "#959595", fontSize: 12 }}>
          {"Data: " + denuncia.data}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: statusStyle.color,
            backgroundColor: statusStyle.backgroundColor,
            padding: 5,
            borderRadius: 10,
          }}
        >
          {"Denúncia " + denuncia.status}
        </Text>
      </View>
      <TouchableOpacity
      // onPress={() => navigation.navigate('LINK')}
      >
        <View style={{ paddingRight: 10 }}>
          <Ionicons name={"trash-outline"} size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  denunciasCard: {
    backgroundColor: "#fff",
    width: 300,
    minHeight: 80,
    borderRadius: 10,
    borderColor: "#0F5398",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DenunciaCard;
