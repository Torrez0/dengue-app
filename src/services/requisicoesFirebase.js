import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export async function cadastrarUsuario(
  nomeCompleto,
  dataNascimento,
  email,
  senha
) {
  try {
    const resultado = await createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {

        const userId = userCredential.user.uid;

        const userInfo = {
          nomeCompleto: nomeCompleto,
          dataNascimento: dataNascimento,
          email: email,
        };

        setDoc(doc(db, "usuarios", userId), userInfo);

        return "Sucesso!";
      })
      .catch((error) => {
        console.error(error);
        return error;
      });

    return resultado;
  } catch (error) {
    return "Erro ao cadastrar usuario";
  }
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      return "Sucesso!";
    })
    .catch((error) => {
      // console.log(error);
      return "Email e senha nao conferem.";
    });
  return resultado;
}

export async function criarDenuncia(
  idUsuario,
  estado,
  cidade,
  endereco,
  descricao,
  data
) {
  try {
    const data = new Date().toISOString().split("T")[0]; 
    const denunciaInfo = {
      usuario: idUsuario,
      estado: estado,
      cidade: cidade,
      endereco: endereco,
      descricao: descricao,
      status: "em análise",
      data: data,
    };

    addDoc(collection(db, "denuncias"), denunciaInfo);

    return "Sucesso!";
  } catch (error) {
    console.error("Erro: ", error);
    return "Erro ao criar denuncia";
  }
}

export async function excluirDenuncia(idDenuncia) {
  try {
    await deleteDoc(doc(db, "denuncias", idDenuncia));
    ("Denúncia excluída com sucesso!");
    return "Sucesso!";
  } catch (error) {
    console.error("Erro ao excluir denúncia:", error);
    return "Erro ao excluir denúncia";
  }
}

export async function obterIdUsuarioLogado() {
  const usuarioAtual = auth.currentUser;
  if (usuarioAtual) {
    const idUsuario = usuarioAtual.uid;
    return idUsuario;
  } else {
    return "Nenhum usuário logado.";
  }
}

export async function buscarInformacoesUsuario() {
  const usuarioAtual = auth.currentUser;
  if (usuarioAtual) {
    const userDoc = await getDoc(doc(db, "usuarios", usuarioAtual.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } else {
    return null;
  }
}