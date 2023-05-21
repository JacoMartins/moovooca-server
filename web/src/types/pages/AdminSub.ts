export interface AdminSubProps {
  item_id: number;
  handleSub: (sub: string) => void;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
  id_linha?: string;
  id_sentido?: string;
  id_viagem?: string;
  id_usuario?: string;
}