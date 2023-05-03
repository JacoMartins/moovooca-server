export interface parada {
  id: number | null;
  id_linha: number | null;
  id_sentido: number | null;
  parada: string;
  minutos: number;
  criado_em: string;
  atualizado_em: string;
}

export interface parada_co {
  name: string,
  fields: parada
}