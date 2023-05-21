import { linha } from "./linha";
import { sentido } from "./sentido";

export interface viagem {
  id: number | null;
  id_linha: number | null;
  id_sentido: number | null;
  id_motorista: number | null;
  data: string;
  origem: string;
  destino: string;
  horario_partida: string;
  horario_chegada?: string;
  duracao_media: number;
  pago_inteira: number;
  pago_meia: number;
  gratuidade: number;
  assentos_disponiveis: number;
  criado_em: string;
  atualizado_em: string;
  linha?: linha;
  sentido?: sentido;
}

export interface paginated_viagens {
  page: string;
  pages: string;
  items: viagem[];
}

export interface viagem_co {
  name: string,
  dependants: string[],
  fields: viagem
}