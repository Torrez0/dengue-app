import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Denuncia } from "../types/DenunciaTypes";
import DenunciaCard from "../components/DenunciaCard";
import { useNavigation } from '@react-navigation/native';
import { PerfilScreenNavigationProp } from "../types/PerfilNavigationTypes";
import { auth, db } from "../config/firebase";
import { criarDenuncia, obterIdUsuarioLogado } from "../services/requisicoesFirebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Denuncias() {

  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [denunciasRealizadas, setDenunciasRealizadas] = useState([]);

  const navigation = useNavigation<PerfilScreenNavigationProp>();

  const buscarDenuncias = async () => {
    try {
      const denunciasRef = collection(db, 'denuncias');
      const q = query(denunciasRef, where('usuario', '==', await obterIdUsuarioLogado()));
      const querySnapshot = await getDocs(q);

      const denuncias = [];
      querySnapshot.forEach((doc) => {
        denuncias.push({ id: doc.id, ...doc.data() });
      });

      setDenunciasRealizadas(denuncias);
    } catch (error) {
      console.error("Erro ao buscar query: ", error);
    }
  }

  // const denuncias: Denuncia[] = [
  //   {
  //     id: "01",
  //     rua: "Rua da Aurora",
  //     numero: "123",
  //     bairro: "Centro",
  //     cidade: "Recife",
  //     estado: "Pernambuco",
  //     data: "02/02/2024",
  //     status: "solucionada",
  //   },
  //   {
  //     id: "02",
  //     rua: "Rua Benjamin Constant",
  //     numero: "1456",
  //     bairro: "Torre",
  //     cidade: "Recife",
  //     estado: "Pernambuco",
  //     data: "25/05/2024",
  //     status: "em análise",
  //   },
  //   {
  //     id: "03",
  //     rua: "Rua Benjamin Constant",
  //     numero: "1456",
  //     bairro: "Torre",
  //     cidade: "Recife",
  //     estado: "Pernambuco",
  //     data: "25/05/2024",
  //     status: "negada",
  //   },
  //   {
  //     id: "04",
  //     rua: "Avenida Rio Branco",
  //     numero: "1456",
  //     bairro: "Torre",
  //     cidade: "Recife",
  //     estado: "Pernambuco",
  //     data: "25/05/2024",
  //     status: "em andamento",
  //   },
  // ];

  async function realizarDenuncia() {

    if (estado === ('') || cidade === ('') || endereco === ('') || descricao === ('')) {
      Alert.alert("Campos vazios", "Verifique se os campos estao preenchidos")
    } else if (await obterIdUsuarioLogado() === 'Nenhum usuário logado.') {
      Alert.alert('Ops!', 'É preciso estar logado para fazer uma denúncia!')
    } else {

      const idUsuario = await obterIdUsuarioLogado();
      const data = '31/05/2024';
      const resultado = await criarDenuncia(idUsuario, estado, cidade, endereco, descricao, data);

      if (resultado === 'Sucesso!') {
        setEstado('');
        setCidade('');
        setEndereco('');
        setDescricao('');

        Alert.alert('Sucesso!', 'Denuncia criada!');
      } else {
        Alert.alert(resultado);
      }

    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Denuncie aqui</Text>
          <TextInput
            style={styles.input}
            placeholder="Selecione o Estado"
            value={estado}
            onChangeText={estado => setEstado(estado)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Selecione a cidade"
            value={cidade}
            onChangeText={cidade => setCidade(cidade)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            value={endereco}
            onChangeText={endereco => setEndereco(endereco)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Descrição / Denúnica"
            value={descricao}
            onChangeText={descricao => setDescricao(descricao)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text>
              <Ionicons name="attach" size={18}></Ionicons>
              Cadastre-se!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => realizarDenuncia()}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <View style={styles.denunciasBox}>
            <Text style={styles.smallTitle}>Suas denúncias</Text>
            <TouchableOpacity style={styles.button} onPress={() => buscarDenuncias()}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
            {denunciasRealizadas.map((denuncias) => (
              <DenunciaCard key={denuncias.id} denuncia={denuncias} />
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
    paddingTop: 40,
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
