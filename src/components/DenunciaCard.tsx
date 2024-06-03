import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DenunciaCardProps } from "../types/DenunciaTypes";
import { excluirDenuncia } from "../services/requisicoesFirebase";

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const DenunciaCard: React.FC<DenunciaCardProps> = ({ denuncia, onDelete }) => {
  const statusStyle = getStatusStyle(denuncia.status);

  const tratarExcluirDenuncia = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta denúncia?",
      [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: async () => {
          const result = await excluirDenuncia(denuncia.id);
          if (result === "Sucesso!") {
            if (onDelete) {
              onDelete(denuncia.id);
            }
          } else {
            Alert.alert("Erro", "Não foi possível excluir a denúncia.");
          }
        }},
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.denunciasCard}>
      <View style={{ maxWidth: 150, rowGap: 5 }}>
        <Text style={{ fontSize: 14, fontWeight: "700" }}>
          {denuncia.endereco}
        </Text>
        <Text style={{ color: "#959595", fontSize: 12 }}>
          {"Data: " + formatDate(denuncia.data)}
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
      <TouchableOpacity onPress={tratarExcluirDenuncia}>
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
