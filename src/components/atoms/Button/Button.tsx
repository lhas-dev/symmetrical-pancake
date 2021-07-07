import styled from "styled-components";
import { Icon } from "../Icon/Icon";

const Wrapper = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  color: #00adef;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 11px;
  transition: all 0.1s ease-in;
  margin: 0;
  padding: 0;

  &:hover {
    opacity: 0.5;
  }

  img {
    margin-right: 7px;
  }
`;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label?: string;
  icon?: string;
}

export const Button = ({ label, icon, onClick }: ButtonProps) => {
  return (
    <Wrapper onClick={onClick}>
      {icon && <Icon src={icon} />}
      {label}
    </Wrapper>
  );
};
