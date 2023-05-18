import { linha } from "../api/linha";
import { paginated_paradas, parada } from "../api/parada";
import { sentido } from "../api/sentido";

export interface LinhaProps {
  cod: number;
  linha: linha;
  sentido: sentido;
  sentidos: sentido[];
  paradas: paginated_paradas;
} 