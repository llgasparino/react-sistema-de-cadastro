import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../config/firebase", () => ({
  auth: {},
}));

describe("Login component", () => {
  test("renderiza inputs e botão", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Acessar/i })
    ).toBeInTheDocument();
  });

  test("submete formulário", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
      target: { value: "user@teste.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Acessar/i }));

    await waitFor(() => {
      // não deve exibir erro por credenciais incorretas
      expect(screen.queryByText(/incorretos/)).not.toBeInTheDocument();
    });
  });
});
