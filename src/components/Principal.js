import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

function Principal() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Observador que verifica o estado da autenticação do usuário
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuário está logado, buscar seus dados no Firestore
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Nenhum documento encontrado para este usuário!");
        }
      } else {
        // Usuário não está logado, redireciona para a página de login
        navigate("/login");
      }
      setLoading(false);
    });

    // Limpa o observador quando o componente é desmontado
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redireciona para o login após sair
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Página Principal</h2>
      {userData ? (
        <div className="user-data">
          <p>
            <strong>Bem-vindo(a), {userData.nome}!</strong>
          </p>
          <p>
            <strong>Nome Completo:</strong> {userData.nome} {userData.sobrenome}
          </p>
          <p>
            <strong>E-mail:</strong> {userData.email}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {userData.dataNascimento}
          </p>
        </div>
      ) : (
        <p>Não foi possível carregar os dados do usuário.</p>
      )}
      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}

export default Principal;
