import { Icon } from "components/atoms/Icon/Icon";
import styled from "styled-components";

const Wrapper = styled.section`
  text-align: center;
  color: #272727;

  h2 {
    font-family: "Open Sans";
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: #272727;
    margin: 0;
    padding-top: 8px;
  }

  p {
    font-family: "Open Sans";
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    margin: 0;
    padding-top: 8px;
  }
`;

interface PageTitleProps {
  title: string;
  description: string;
  icon: string;
}
export const PageTitle = ({ title, description, icon }: PageTitleProps) => (
  <Wrapper>
    <Icon src={icon} />
    <h2>{title}</h2>
    <p>{description}</p>
  </Wrapper>
);
