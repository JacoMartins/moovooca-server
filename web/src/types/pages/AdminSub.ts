export interface AdminSubProps {
  item_id: number;
  handleSub: (sub: string) => void;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
}