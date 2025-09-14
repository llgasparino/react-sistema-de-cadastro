// Importe as funções necessárias dos SDKs que você precisa
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Adicione aqui a configuração do seu projeto Firebase
// Cole o objeto firebaseConfig que você copiou do console do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte os serviços que vamos utilizar na aplicação
export const auth = getAuth(app);
export const db = getFirestore(app);
