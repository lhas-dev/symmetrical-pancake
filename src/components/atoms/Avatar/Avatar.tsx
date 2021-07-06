import styled from "styled-components";
import { useDevice } from "../../../hooks/useDevice";

interface AvatarProps {
  src?: string;
  name?: string;
  hasNotification?: boolean;
}

const Wrapper = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
`;

const Image = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 99px;

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const Badge = styled.span`
  width: 8px;
  height: 8px;
  background: #e72176;
  border-radius: 8px;
  display: inline-block;
  position: absolute;
  right: -1px;
  top: -1px;
`;

export const Avatar = ({ src, name, hasNotification }: AvatarProps) => {
  const device = useDevice();
  return (
    <Wrapper>
      {hasNotification && device.isMobile() && <Badge />}
      <Image src={src} alt={name} />
    </Wrapper>
  );
};
