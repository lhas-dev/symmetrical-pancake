import styled from "styled-components";
import { useDevice } from "../../../hooks/useDevice";

interface HeaderProps {}

const Wrapper = styled.header``;

export const Header = ({}: HeaderProps) => {
  const device = useDevice();
  return <Wrapper>header</Wrapper>;
};
