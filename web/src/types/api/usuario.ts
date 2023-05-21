import { reserva } from "./reserva";

export interface Usuario {
  id: number | null;
  nome: string;
  sobrenome: string;
  nome_usuario: string;
  senha?: string;
  email: string;
  admin: number;
  motorista: number;
  reservas?: reserva[];
  criado_em: string;
  atualizado_em?: string;
}


export interface paginated_usuarios {
  page: string;
  pages: string;
  items: Usuario[];
}


export interface usuario_co {
  name: string,
  dependants: string[],
  fields: Usuario
}