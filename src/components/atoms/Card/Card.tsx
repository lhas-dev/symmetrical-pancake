import styled from "styled-components";
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
} from "styled-system";

export const Wrapper = styled.article`
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 7px;
  width: 100%;

  ${space}
  ${layout}
  ${flexbox}
  ${grid}
`;

const CardBodyWrapper = styled.div`
  padding: 24px;

  ${space}
  ${layout}
  ${flexbox}
  ${grid}
`;

const CardDividerWrapper = styled.span`
  width: 100%;
  height: 1px;
  background: #ddd;
  display: block;
`;

interface CardProps extends SpaceProps, LayoutProps, FlexboxProps, GridProps {
  children?: React.ReactNode;
}

export const Card = ({ children, ...rest }: CardProps) => (
  <Wrapper {...rest}>{children}</Wrapper>
);

export const CardBody = ({ children, ...rest }: CardProps) => (
  <CardBodyWrapper {...rest}>{children}</CardBodyWrapper>
);

export const CardDivider = ({ children }: CardProps) => (
  <CardDividerWrapper>{children}</CardDividerWrapper>
);
