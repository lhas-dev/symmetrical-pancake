import styled from "styled-components";
import { space, SpaceProps, layout, LayoutProps } from "styled-system";

export const Wrapper = styled.article`
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 7px;
  width: 100%;

  ${space}
  ${layout}
`;

const CardBodyWrapper = styled.div`
  padding: 24px;
`;

const CardDividerWrapper = styled.span`
  width: 100%;
  height: 1px;
  background: #ddd;
  display: block;
`;

interface CardProps extends SpaceProps, LayoutProps {
  children?: React.ReactNode;
}

export const Card = ({ children, ...rest }: CardProps) => (
  <Wrapper {...rest}>{children}</Wrapper>
);

export const CardBody = ({ children }: CardProps) => (
  <CardBodyWrapper>{children}</CardBodyWrapper>
);

export const CardDivider = ({ children }: CardProps) => (
  <CardDividerWrapper>{children}</CardDividerWrapper>
);
