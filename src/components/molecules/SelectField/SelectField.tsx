import { useState } from "react";
import { Icon } from "components/atoms/Icon/Icon";
import styled, { css } from "styled-components";
import LoadingIcon from "icons/LoadingIcon.gif";
import React from "react";

interface SelectFieldWrapperProps {
  focused?: boolean;
}

const Wrapper = styled.div``;

const SelectFieldWrapper = styled.div<SelectFieldWrapperProps>`
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
    width: 21px;
  }

  select {
    position: absolute;
    left: 0;
    top: 0;
    width: 110%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding-left: 10px;
    padding-top: 10px;
    font-family: "Open Sans";
    font-size: 18px;
    color: #272727;
    z-index: 2;
    cursor: pointer;

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

interface SelectFieldProps extends React.HTMLProps<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  icon?: string;
  loading?: boolean;
  error?: string;
  ref: any;
  options: { label: string | number; value: string | number }[];
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(({
  label,
  placeholder,
  icon = "ArrowDownIcon",
  loading,
  error,
  options,
  value,
  onFocus,
  onBlur,
  onChange,
}, ref) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLSelectElement>) => {
    setFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Wrapper>
      <SelectFieldWrapper focused={focused}>
        {label && <label>{label}</label>}
        <select
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          ref={ref}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {icon && !loading && <Icon src={icon} />}
        {loading && <img alt="Loading" className="loading" src={LoadingIcon} />}
      </SelectFieldWrapper>
      {error && (
        <Error>
          <Icon src="WarningIcon" />
          {error}
        </Error>
      )}
    </Wrapper>
  );
});
