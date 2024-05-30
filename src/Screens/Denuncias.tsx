import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DenunciaCard from "../components/denunciasCard";

type Denuncia = {
  id: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  data: string;
  status: string;
};

export default function Denuncias() {

  let endereco: string = "Rua da Aurora";
  let data: string = "01/03/2024";
  let statusDenuncia = "em análise";

  const denuncias: Denuncia[] = [
    {
      id: "01",
      rua: "Rua da Aurora",
      numero: "123",
      bairro: "Centro",
      cidade: "Recife",
      estado: "Pernambuco",
      data: "02/02/2024",
      status: "solucionada",
    },
    {
      id: "02",
      rua: "Rua Benjamin Constant",
      numero: "1456",
      bairro: "Torre",
      cidade: "Recife",
      estado: "Pernambuco",
      data: "25/05/2024",
      status: "em análise",
    },
    {
      id: "02",
      rua: "Rua Benjamin Constant",
      numero: "1456",
      bairro: "Torre",
      cidade: "Recife",
      estado: "Pernambuco",
      data: "25/05/2024",
      status: "negada",
    },
    {
      id: "02",
      rua: "Avenida Rio Branco",
      numero: "1456",
      bairro: "Torre",
      cidade: "Recife",
      estado: "Pernambuco",
      data: "25/05/2024",
      status: "em andamento",
    },
  ];

  // const Denuncias = () => {
  //   return (
  //     <View style={styles.denunciasCard}>
  //       <View style={{ maxWidth: 150, rowGap: 5 }}>
  //         <Text style={{ fontSize: 14, fontWeight: "700" }}>{endereco}</Text>
  //         <Text style={{ color: "#959595", fontSize: 12 }}>
  //           {"Data: " + data}
  //         </Text>
  //         <Text
  //           style={{
  //             fontSize: 12,
  //             color: "#4B9AE9",
  //             backgroundColor: "#98C3ED",
  //             padding: 5,
  //             borderRadius: 10,
  //           }}
  //         >
  //           {"Denúncia " + statusDenuncia}
  //         </Text>
  //       </View>
  //       <View style={{ paddingRight: 10 }}>
  //         <Ionicons name={"trash-outline"} size={25}></Ionicons>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Denuncie aqui</Text>
          <TextInput
            style={styles.input}
            placeholder="Selecione o Estado"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Selecione a cidade"
            editable={false}
            selectTextOnFocus={false}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            editable={false}
            selectTextOnFocus={false}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Descrição / Denúnica"
          ></TextInput>

          <Text style={styles.text}>Anexar evidências</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <View style={styles.denunciasBox}>
            <Text style={styles.smallTitle}>Suas denúnias</Text>

            {/* <View style={styles.denunciasCard}>
              <View style={{ maxWidth: 150, rowGap: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "700" }}>
                  {endereco}
                </Text>
                <Text style={{ color: "#959595", fontSize: 12 }}>
                  {"Data: " + data}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#4B9AE9",
                    backgroundColor: "#98C3ED",
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  {"Denúncia " + statusDenuncia}
                </Text>
              </View>
              <View style={{ paddingRight: 10 }}>
                <Ionicons name={"trash-outline"} size={25}></Ionicons>
              </View>
            </View> */}

            {denuncias.map((denuncia) => (
              <DenunciaCard key={denuncia.id} denuncia={denuncia} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2C9F0",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
  },
  content: {
    alignSelf: "center",
    flex: 1,
    width: 350,
    height: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  welcomeBar: {
    backgroundColor: "#308DE9",
    width: "100%",
    paddingTop: 35,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 100,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "500",
    color: "#FFF",
    marginLeft: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFF",
    paddingTop: 25,
  },
  smallTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#FFF",
    paddingTop: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  link: {
    color: "#0000EE",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#B9082C",
    borderRadius: 10,
    padding: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
  denunciasBox: {
    paddingBottom: 40,
    alignSelf: "center",
  },
  denunciasCard: {
    backgroundColor: "#fff",
    width: 300,
    minHeight: 80,
    borderRadius: 10,
    borderBlockColor: "#0F5398",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
