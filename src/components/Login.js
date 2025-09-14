import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Tenta fazer o login com o e-mail e senha fornecidos
      await signInWithEmailAndPassword(auth, email, senha);
      // Se o login for bem-sucedido, navega para a página principal
      navigate("/principal");
    } catch (error) {
      console.error("Erro no login:", error);
      setError("E-mail ou senha incorretos. Usuário não cadastrado.");
    }
  };

  return (
    <div className="container">
      <h2>Página de Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Acessar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => navigate("/")} className="link-button">
        Não tem uma conta? Cadastre-se
      </button>
    </div>
  );
}

export default Login;
