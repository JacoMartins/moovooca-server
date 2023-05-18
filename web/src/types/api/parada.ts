import { linha } from "./linha";
import { sentido } from "./sentido";

export interface parada {
  id: number | null;
  id_linha: number | null;
  id_sentido: number | null;
  parada: string;
  latitude: number;
  longitude: number;
  criado_em: string;
  atualizado_em: string;

  linha?: linha;
  sentido?: sentido;
}

export interface paginated_paradas {
  page: string;
  pages: string;
  items: parada[];
}

export interface parada_co {
  name: string,
  fields: parada
}