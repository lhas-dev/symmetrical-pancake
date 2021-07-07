import styled from "styled-components";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 7px;
`;

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => <Wrapper>{children}</Wrapper>;
