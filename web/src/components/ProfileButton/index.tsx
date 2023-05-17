import { ProfileButtonProps } from "../../types/components/profileButton";
import { Container } from "./styles";
import Image from "next/image";
import { User } from "phosphor-react";

export default function ProfileButton({ profilePicture, mainName, onClick }: ProfileButtonProps) {
  return (
    <Container onClick={onClick}>
      {
        profilePicture ?
          <div style={{ backgroundImage: `url('${profilePicture}')` }} className="image" />
          :
          <User size={24} weight='regular' color='#999999' />
      }
    </Container>
  )
}