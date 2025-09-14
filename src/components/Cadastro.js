import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase"; // Importe auth e db

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    setError("");

    try {
      // 1. Criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // 2. Gravar os dados adicionais no Firestore
      // Criamos um documento na coleção 'usuarios' com o UID do usuário como ID
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: user.email,
      });

      // 3. Redirecionar para a página de login após o sucesso
      alert("Usuário cadastrado com sucesso! Faça o login.");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Falha ao cadastrar. Verifique os dados e tente novamente.");
      alert(error.message); // Mostra um alerta com o erro
    }
  };

  return (
    <div className="container">
      <h2>Página de Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
          required
        />
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          placeholder="Data de Nascimento"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => navigate("/login")} className="link-button">
        Já tem uma conta? Faça Login
      </button>
    </div>
  );
}

export default Cadastro;
