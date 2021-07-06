import { Icon } from "components/atoms/Icon/Icon";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  background: transparent;
  border: none;
  align-items: center;
  cursor: pointer;
  margin-left: 15px;
  padding: 0;
  transition: all 0.1s ease-in;

  &:hover {
    opacity: 0.5;
  }

  p {
    margin: 0;
    padding: 0;
    color: #bababa;
    letter-spacing: 1.5px;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 11px;
    line-height: 15px;
    text-transform: uppercase;
    padding-left: 14px;
    padding-right: 14px;
  }
`;

export const LogoutButton = () => (
  <Wrapper>
    <Icon src="ShutdownIcon" />
    <p>Sair</p>
  </Wrapper>
);
