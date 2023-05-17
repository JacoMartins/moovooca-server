import { ReactNode } from "react";
import { Usuario } from "../api/usuario";

export interface AuthCredenciais {
  identificador: string;
  senha: string;
};

export interface AuthContextData {
  auth(credenciais: AuthCredenciais): Promise<void>;
  autenticado: boolean;
  usuario: Usuario;
  busy: boolean;
  reload: () => void;
};

export interface AuthProviderProps {
  children: ReactNode;
}