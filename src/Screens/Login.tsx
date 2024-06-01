import { PerfilScreenNavigationProp } from "../types/NavigationTypes";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { logar } from "../services/requisicoesFirebase";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  async function realizarLogin() {
    if (email === "" || senha === "") {
      Alert.alert("Campos vazios", "Verifique se os campos estao preenchidos");
    } else {
      const resultado = await logar(email, senha);
      if (resultado === "Sucesso!") {
        setEmail("");
        setSenha("");
        // Alert.alert('Sucesso!', 'Login realizado com sucesso!')
        navigation.navigate("Perfil");
      } else {
        Alert.alert("Nao foi efetuado login", resultado);
      }
    }
  }

  function deslogar() {
    auth.signOut();
    Alert.alert("Logoff", "Deslogado com sucesso!");
  }

  function handleForgotPassword() {
    if (email == "") {
      Alert.alert(
        "Campo vazio",
        "Por favor, preencha o campo de e-mail para enviarmos o reset de senha."
      );
    } else {
      Alert.alert(
        "Confirmar reset de senha?",
        "Clique em Confirmar para enviarmos um e-mail para você!",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: () => {
              sendPasswordResetEmail(auth, email).catch((error) =>
                console.log(error)
              );
            },
          },
        ]
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require("../../assets/dengue-logo.png")}
            style={styles.logo}
          />
          <TextInput
            placeholder="Digite o seu e-mail"
            style={styles.input}
            value={email}
            onChangeText={(email) => setEmail(email)}
          ></TextInput>
          <TextInput
            placeholder="Digite a sua senha"
            style={styles.input}
            value={senha}
            secureTextEntry={true}
            onChangeText={(senha) => setSenha(senha)}
          ></TextInput>
          <Text style={styles.text}>
            Esqueceu a senha?
            <TouchableOpacity onPress={() => handleForgotPassword()}>
              <Text style={styles.link}>Clique aqui!</Text>
            </TouchableOpacity>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => realizarLogin()}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Não possui cadastro?
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.link}>Cadastre-se!</Text>
            </TouchableOpacity>
          </Text>
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
    paddingTop: 100,
  },
  content: {
    alignSelf: "center",
    flex: 1,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  logo: {
    marginBottom: 23,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 5,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputSenha: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "100%",
    height: 60,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
  },
  eyeIcon: {
    padding: 5,
    width: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
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
