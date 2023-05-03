import { reserva } from "./reserva";

export interface Usuario {
  id: number | null;
  nome: string;
  sobrenome: string;
  nome_usuario: string;
  email: string;
  admin: number;
  motorista: number;
  reservas?: reserva[];
  criado_em: Date;
  atualizado_em?: Date;
}

export interface usuario_co {
  name: string,
  fields: Usuario
}