export interface sentido {
  id: number | null;
  id_linha: number | null;
  sentido: string;
  ponto_partida: string;
  ponto_destino: string;
  horario_inicio: string;
  horario_fim: string;
  criado_em: string;
  atualizado_em: string;
}

export interface paginated_sentidos {
  page: string;
  pages: string;
  items: sentido[];
}

export interface sentido_co {
  name: string,
  fields: sentido
}