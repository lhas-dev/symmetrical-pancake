import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 7px;
  ${space}
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

interface CardProps extends SpaceProps {
  children?: React.ReactNode;
}

export const Card = ({ children, ...space }: CardProps) => (
  <Wrapper {...space}>{children}</Wrapper>
);

export const CardBody = ({ children }: CardProps) => (
  <CardBodyWrapper>{children}</CardBodyWrapper>
);

export const CardDivider = ({ children }: CardProps) => (
  <CardDividerWrapper>{children}</CardDividerWrapper>
);
