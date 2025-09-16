import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cadastro from "../Cadastro";

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { uid: "abc123", email: "novo@teste.com" } })
  ),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../config/firebase", () => ({
  auth: {},
  db: {},
}));

describe("Cadastro component", () => {
  test("renderiza campos principais", () => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
    // Usa regex com limites de palavra para evitar conflito com 'Sobrenome'
    expect(screen.getByPlaceholderText(/^Nome$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Sobrenome$/i)).toBeInTheDocument();
  });

  test("submete cadastro", async () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
      target: { value: "novo@teste.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Nome$/i), {
      target: { value: "Joao" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Sobrenome$/i), {
      target: { value: "Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Data de Nascimento/i), {
      target: { value: "2000-01-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
