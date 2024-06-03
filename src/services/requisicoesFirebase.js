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
        // console.log("Usuario criado: ", userCredential.user);

        const userId = userCredential.user.uid;

        const userInfo = {
          nomeCompleto: nomeCompleto,
          dataNascimento: dataNascimento,
          email: email,
        };

        setDoc(doc(db, "usuarios", userId), userInfo);

        // console.log("Usuario cadastrado: ", userCredential.user);

        return "Sucesso!";
      })
      .catch((error) => {
        console.error(error);
        return error;
      });

    return resultado;
  } catch (error) {
    // console.log("erro ao cadastrar usuario: ", error);
    return "Erro ao cadastrar usuario";
  }
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // console.log(userCredential);

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
    const data = new Date().toISOString().split('T')[0]; // Obtém a data no formato 'yyyy-mm-dd'
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

    // console.log("Denuncia criada");

    return "Sucesso!";
  } catch (error) {
    console.error("Erro: ", error);
    return "Erro ao criar denuncia";
  }
}

// TODO: APAGAR DENUNCIA DO FIREBASE
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
    // console.log("ID do usuário logado:", idUsuario);
    return idUsuario;
  } else {
    // console.log("Nenhum usuário logado.");
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
      // console.log("Nenhum documento encontrado!");
      return null;
    }
  } else {
    // console.log("Nenhum usuário logado.");
    return null;
  }
}

export async function excluirContaUsuario() {
  try {
    const usuarioAtual = auth.currentUser;
    if (!usuarioAtual) {
      return "Nenhum usuário logado.";
    }

    // Deletar documentos relacionados ao usuário no Firestore
    const denunciasRef = collection(db, "denuncias");
    const q = query(denunciasRef, where("usuario", "==", usuarioAtual.uid));
    const querySnapshot = await getDocs(q);

    const batch = db.batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Deletar o documento do usuário no Firestore
    await deleteDoc(doc(db, "usuarios", usuarioAtual.uid));

    // Deletar a conta de autenticação do usuário
    await deleteUser(usuarioAtual);

    console.log("Conta excluída com sucesso!");
    return "Sucesso!";
  } catch (error) {
    console.error("Erro ao excluir a conta:", error);
    return "Erro ao excluir a conta";
  }
}
