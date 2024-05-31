import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Perfil() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeBar}>
        <Image
          source={require("../../assets/dengue-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Olá, Bruna!</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do usuário"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="E-mail cadastrado"
            editable={false}
            selectTextOnFocus={false}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Data de nascimento"
            editable={false}
            selectTextOnFocus={false}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Número de telefone cadastrado"
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Selecione o seu Estado"
          ></TextInput>

          <Text style={styles.text}>Sair</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Suas denúncias</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Excluir conta</Text>
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
    // paddingTop: 30,
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
