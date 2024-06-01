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
  updateDoc,
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
        console.log("Usuario criado: ", userCredential.user);

        const userId = userCredential.user.uid;

        const userInfo = {
          nomeCompleto: nomeCompleto,
          dataNascimento: dataNascimento,
          email: email,
        };

        setDoc(doc(db, "usuarios", userId), userInfo);

        console.log("Usuario cadastrado: ", userCredential.user);

        return "Sucesso!";
      })
      .catch((error) => {
        console.error(error);
        return error;
      });

    return resultado;
  } catch (error) {
    console.log("erri ao cadastrar usuario: ", error);
    return "Erro ao cadastrar usuario";
  }
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log(userCredential);

      return "Sucesso!";
    })
    .catch((error) => {
      console.log(error);
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

    console.log("Denuncia criada");

    return "Sucesso!";
  } catch (error) {
    console.error("Erro: ", error);
    return "Erro ao criar denuncia";
  }
}

// TODO: APAGAR DENUNCIA DO FIREBASE
export async function excluirDenuncia(idDenuncia) {
  // try {
  //   await deleteDoc(doc(db, "denuncias", idDenuncia));
  //   console.log("Denúncia excluída com sucesso!");
  //   return "Sucesso!";
  // } catch (error) {
  //   console.error("Erro ao excluir denúncia:", error);
  //   return "Erro ao excluir denúncia";
  // }
}

export async function obterIdUsuarioLogado() {
  const usuarioAtual = auth.currentUser;
  if (usuarioAtual) {
    const idUsuario = usuarioAtual.uid;
    console.log("ID do usuário logado:", idUsuario);
    return idUsuario;
  } else {
    console.log("Nenhum usuário logado.");
    return "Nenhum usuário logado.";
  }
}
