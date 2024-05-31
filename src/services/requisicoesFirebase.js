import { auth, db } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export async function cadastrarUsuario(nomeCompleto, dataNascimento, email, senha){
    try {
        const resultado = await createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential)=> {
                console.log("Usuario criado: ", userCredential.user);

                const userId = userCredential.user.uid;

                const userInfo = {
                    nomeCompleto: nomeCompleto,
                    dataNascimento: dataNascimento,
                    email: email
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
    } catch(error){
        console.log("erri ao cadastrar usuario: ", error)
        return "Erro ao cadastrar usuario";
    }
}

export async function logar(email, senha){

    const resultado = await signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log(userCredential)

            return 'Sucesso!'
        })
        .catch((error) => {
            console.log(error)
            return "Email e senha nao conferem."
        });
        return resultado

}