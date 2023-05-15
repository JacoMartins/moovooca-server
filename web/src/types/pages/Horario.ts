import { linha } from "../api/linha";
import { paginated_sentidos, sentido } from "../api/sentido";
import { paginated_viagens, viagem } from "../api/viagem";

export interface HorarioProps {
  linha: linha;
  sentido: sentido;
  sentidos: paginated_sentidos;
  viagens: paginated_viagens;

  lid: string;
  sid: string;
  page: string;
} 