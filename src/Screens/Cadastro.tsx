import { useNavigation } from "@react-navigation/native";
import {
  Alert, StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { PerfilScreenNavigationProp } from "../types/PerfilNavigationTypes"; import { useState } from 'react';
import { cadastrarUsuario } from '../services/requisicoesFirebase';


export default function Cadastro() {
  const navigation = useNavigation<PerfilScreenNavigationProp>();



  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  async function realizarCadastro() {
    if (nomeCompleto === '' || dataNascimento === '' || email === '' || senha === '') {
      Alert.alert('Campos vazios', 'Verifique os campos', [{ text: 'OK', style: 'cancel' }], { cancelable: true });
    } else if (senha !== confirmaSenha) {
      Alert.alert('Senha nao coincide', 'Verifique a senha', [{ text: 'OK', style: 'cancel' }], { cancelable: true });
    }
    else {
      const resultado = await cadastrarUsuario(nomeCompleto, dataNascimento, email, senha);
      if (resultado === 'Sucesso!') {
        Alert.alert(resultado, 'Usuario cadastrado!')
        setNomeCompleto('');
        setDataNascimento('');
        setEmail('');
        setSenha('');
        setConfirmaSenha('');
      } else {
        Alert.alert(resultado, "Erro ao cadastrar.")
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Cadastre-se</Text>
          <TextInput
            placeholder="Digite o seu nome completo"
            style={styles.input}
            value={nomeCompleto}
            onChangeText={nomeCompleto => setNomeCompleto(nomeCompleto)}
          ></TextInput>
          <TextInput
            placeholder="Digite a sua data de nascimento"
            style={styles.input}
            value={dataNascimento}
            onChangeText={dataNascimento => setDataNascimento(dataNascimento)}
          ></TextInput>
          <TextInput
            placeholder="Digite o seu e-mail"
            style={styles.input}
            value={email}
            onChangeText={email => setEmail(email)}
          ></TextInput>
          <TextInput
            placeholder="Digite a sua senha"
            style={styles.input}
            value={senha}
            onChangeText={senha => setSenha(senha)}
          ></TextInput>
          <TextInput
            placeholder="Confirme a sua senha"
            style={styles.input}
            value={confirmaSenha}
            onChangeText={confirmaSenha => setConfirmaSenha(confirmaSenha)}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={() => realizarCadastro()}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Voltar</Text>
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
    paddingTop: 100,
    //   width: '100%',
  },
  content: {
    alignSelf: "center",
    backgroundColor: "#A2C9F0",
    flex: 1,
    width: 350,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
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
