import { Usuario } from "./usuario";
import { viagem } from "./viagem";

export interface reserva {
  id: number | null;
  id_viagem: number | null;
  id_usuario: number | null;
  cod: number;
  forma_pagamento: string;
  criado_em: string;
  atualizado_em: string;
  viagem?: viagem;
  usuario?: Usuario;
}

export interface reserva_co {
  name: string,
  fields: reserva
}