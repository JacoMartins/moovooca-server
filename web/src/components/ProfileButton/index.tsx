import { ProfileButtonProps } from "../../types/components/profileButton";
import { Container } from "./styles";
import Image from "next/image";

export default function ProfileButton({ picture_profile, main_name, onClick }: ProfileButtonProps) {
  return (
    <Container onClick={onClick}>
      <Image src={picture_profile} alt={`Foto de perfil de ${main_name}`} />
    </Container>
  )
}