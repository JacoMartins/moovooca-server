import { ProfileButtonProps } from "../../types/components/profileButton";
import { Container } from "./styles";
import Image from "next/image";

export default function ProfileButton({ picture_profile, main_name, onClick }: ProfileButtonProps) {
  return (
    <Container onClick={onClick}>
      <div style={{backgroundImage: `url('${picture_profile}')`}} className="image" />
    </Container>
  )
}