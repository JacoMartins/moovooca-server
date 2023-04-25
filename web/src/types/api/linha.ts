import { sentido } from "./sentido";

export interface linha {
  id: number;
  cod: number;
  nome: string;
  campus: string;
  valor_inteira: number;
  valor_meia: number;
  tipo: string;
  capacidade_assento: number;
  criado_em: Date;
  atualizado_em: Date;
  sentidos: [sentido];
}

export interface response_linha {
  status: number;
  message: string;
  data: linha[];
}