import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { PerfilScreenNavigationProp } from "../types/NavigationTypes";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { buscarInformacoesUsuario } from "../services/requisicoesFirebase";

export default function Perfil() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [dataNascimentoUsuario, setDataNascimentoUsuario] = useState("");
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  useEffect(() => {
    async function obterInformacoesUsuario() {
      const informacoesUsuario = await buscarInformacoesUsuario();
      if (informacoesUsuario) {
        setNomeUsuario(informacoesUsuario.nomeCompleto);
        setEmailUsuario(informacoesUsuario.email);
        setDataNascimentoUsuario(informacoesUsuario.dataNascimento);
      }
    }

    obterInformacoesUsuario();
  }, []);

  function deslogar() {
    auth.signOut();
    Alert.alert("Logoff", "Deslogado com sucesso!");
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeBar}>
        <Image
          source={require("../../assets/dengue-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>
          Olá, {nomeUsuario.split(" ")[0]}!{" "}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Perfil</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="Nome do usuário"
            value={nomeUsuario}
            editable={false}
            selectTextOnFocus={false}
          ></TextInput>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="E-mail cadastrado"
            value={emailUsuario}
            editable={false}
            selectTextOnFocus={false}
          />
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="Data de nascimento"
            value={dataNascimentoUsuario}
            editable={false}
            selectTextOnFocus={false}
          />
          <Text style={styles.text} onPress={deslogar}>
            Sair
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Denuncias")}
          >
            <Text style={styles.buttonText}>Suas denúncias</Text>
          </TouchableOpacity>
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
  },
  content: {
    alignSelf: "center",
    flex: 1,
    width: 350,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFF",
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
  disabledInput: {
    backgroundColor: "#E0E0E0",
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
});
