import styled from "styled-components";
import { Icon } from "../../atoms/Icon/Icon";

export const Wrapper = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.1s ease-in;

  &:hover {
    opacity: 0.5;
  }
`;

export const Square = styled.span`
  width: 19px;
  height: 19px;
  background: #fff;
  border: 1px solid #00adef;
  border-radius: 4px;
  margin-right: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Label = styled.p`
  color: #272727;
  font-size: 14px;
  line-height: 19px;
  font-family: "Open Sans";
  text-align: left;
`;

interface CheckboxProps {
  label?: string;
  value: boolean;
  onChange: () => any;
}

export const Checkbox = ({ label, value, onChange }: CheckboxProps) => (
  <Wrapper type="button" onClick={onChange}>
    <Square>{value && <Icon src="TickIcon" />}</Square>
    {label && <Label>{label}</Label>}
  </Wrapper>
);
