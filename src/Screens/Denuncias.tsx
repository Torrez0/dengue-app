import React, { useState, useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import {
  criarDenuncia,
  obterIdUsuarioLogado,
} from "../services/requisicoesFirebase";
import AuthContext from "../context/AuthContext";
import { RootTabNavigationProp } from "../types/NavigationTypes";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import DenunciaCard from "../components/DenunciaCard";

export default function Denuncias() {
  const { isLoggedIn } = useContext(AuthContext); // Acesse o estado de login do contexto
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [denunciasRealizadas, setDenunciasRealizadas] = useState([]);

  const navigation = useNavigation<RootTabNavigationProp>();

  async function realizarDenuncia() {
    if (estado === "" || cidade === "" || endereco === "" || descricao === "") {
      Alert.alert("Campos vazios", "Verifique se os campos estão preenchidos");
    } else if (!isLoggedIn) {
      // Verifica se o usuário não está logado
      Alert.alert("Ops!", "É preciso estar logado para fazer uma denúncia!");
    } else {
      const idUsuario = await obterIdUsuarioLogado();
      const data = "31/05/2024";
      const resultado = await criarDenuncia(
        idUsuario,
        estado,
        cidade,
        endereco,
        descricao,
        data
      );

      if (resultado === "Sucesso!") {
        setEstado("");
        setCidade("");
        setEndereco("");
        setDescricao("");

        Alert.alert("Sucesso!", "Denúncia criada!");
      } else {
        Alert.alert(resultado);
      }
    }
  }

  const buscarDenuncias = async () => {
    try {
      const denunciasRef = collection(db, "denuncias");
      const q = query(
        denunciasRef,
        where("usuario", "==", await obterIdUsuarioLogado())
      );
      const querySnapshot = await getDocs(q);

      const denuncias = [];
      querySnapshot.forEach((doc) => {
        denuncias.push({ id: doc.id, ...doc.data() });
      });

      setDenunciasRealizadas(denuncias);
    } catch (error) {
      console.error("Erro ao buscar query: ", error);
    }
  };

  const handleDelete = (id) => {
    setDenunciasRealizadas(denunciasRealizadas.filter((denuncia) => denuncia.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Denuncie aqui</Text>
          <TextInput
            style={styles.input}
            placeholder="Selecione o Estado"
            value={estado}
            onChangeText={(estado) => setEstado(estado)}
          />
          <TextInput
            style={styles.input}
            placeholder="Selecione a cidade"
            value={cidade}
            onChangeText={(cidade) => setCidade(cidade)}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            value={endereco}
            onChangeText={(endereco) => setEndereco(endereco)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição / Denúnica"
            value={descricao}
            onChangeText={(descricao) => setDescricao(descricao)}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text>
              <Ionicons name="attach" size={18} />
              Anexar evidências
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={realizarDenuncia}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <View style={styles.denunciasBox}>
            <Text style={styles.smallTitle}>Suas denúncias</Text>
            <TouchableOpacity
              // style={styles.button}
              onPress={() => buscarDenuncias()}
            >
              <Text
              // style={styles.buttonText}
              >
                <Ionicons name="reload-outline" size={18}></Ionicons>
                Atualizar lista
              </Text>
            </TouchableOpacity>
            {denunciasRealizadas.map((denuncias) => (
              <DenunciaCard key={denuncias.id} denuncia={denuncias} onDelete={handleDelete} />
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
