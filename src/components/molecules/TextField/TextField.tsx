import { useState } from "react";
import { Icon } from "components/atoms/Icon/Icon";
import styled, { css } from "styled-components";

interface WrapperProps {
  focused?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background: #f5f5f5;
  border-radius: 7px 7px 0px 0px;
  border-bottom: 1px solid #ddd;
  position: relative;
  overflow: hidden;
  min-height: 70px;
  margin-bottom: 24px;
  transition: all 0.1s ease-in;

  ${({ focused }) =>
    focused &&
    css`
      border-bottom: 2px solid #00adef;
    `}

  label {
    position: absolute;
    top: 11px;
    left: 14px;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #272727;
  }

  img {
    position: absolute;
    right: 14px;
    top: 50%;
    margin-top: -10px;
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding-left: 14px;
    padding-top: 10px;
    font-family: "Open Sans";
    font-size: 18px;
    color: #272727;

    &::placeholder {
      font-weight: 400;
      line-height: 25px;
      color: #bababa;
    }
  }
`;

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: string;
}

export const TextField = ({
  label,
  placeholder,
  type = "text",
  icon,
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <Wrapper focused={focused}>
      {label && <label>{label}</label>}
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        type={type}
      />
      {icon && <Icon src={icon} />}
    </Wrapper>
  );
};
