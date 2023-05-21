import { sentido } from "./sentido";

export interface linha {
  id: number | null;
  cod: number;
  nome: string;
  campus: string;
  valor_inteira: number;
  valor_meia: number;
  tipo: string;
  capacidade_assento: number;
  tags: string;
  criado_em: string;
  atualizado_em: string;
  sentidos?: sentido[];
}

export interface paginated_linhas {
  page: string;
  pages: string;
  items: linha[];
}

export interface linha_co {
  name: string,
  dependants: string[],
  fields: linha
}