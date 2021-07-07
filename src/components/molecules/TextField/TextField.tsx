import { useState } from "react";
import { Icon } from "components/atoms/Icon/Icon";
import styled, { css } from "styled-components";
import InputMask from "react-input-mask";
import LoadingIcon from "icons/LoadingIcon.gif";

interface TextFieldWrapperProps {
  focused?: boolean;
}

const Wrapper = styled.div``;

const TextFieldWrapper = styled.div<TextFieldWrapperProps>`
  background: #f5f5f5;
  border-radius: 7px 7px 0px 0px;
  border-bottom: 1px solid #ddd;
  position: relative;
  overflow: hidden;
  min-height: 70px;
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
    margin-top: -6px;
    height: 21px;
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
    z-index: 2;

    &::placeholder {
      font-weight: 400;
      line-height: 25px;
      color: #bababa;
    }
  }
`;

const Error = styled.p`
  color: #e72176;
  font-size: 14px;
  line-height: 19px;
  font-family: "Open Sans";
  font-weight: normal;
  margin: 0;
  margin-left: 7px;
  margin-top: 7px;
  margin-bottom: 7px;
  display: inline-flex;
  align-items: center;

  img {
    margin-right: 7px;
  }
`;

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: string;
  loading?: boolean;
  error?: string;
  mask?: string;
}

export const TextField = ({
  label,
  placeholder,
  type = "text",
  icon,
  loading,
  error,
  mask,
  onFocus,
  onBlur,
  onChange,
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);
  const Element = mask ? InputMask : "input";
  const maskProps = mask ? { mask, maskPlaceholder: null } : { mask: "" };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Wrapper>
      <TextFieldWrapper focused={focused}>
        {label && <label>{label}</label>}
        <Element
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          type={type}
          onChange={handleChange}
          {...maskProps}
        />
        {icon && !loading && <Icon src={icon} />}
        {loading && <img alt="Loading" className="loading" src={LoadingIcon} />}
      </TextFieldWrapper>
      {error && (
        <Error>
          <Icon src="WarningIcon" />
          {error}
        </Error>
      )}
    </Wrapper>
  );
};
