import styled from "styled-components";

const Wrapper = styled.div`
  height: 40px;
  border-right: 1px solid #dddddd;
  padding-right: 15px;
  font-family: "Open Sans";
  margin-left: 14px;

  h2 {
    font-size: 18px;
    line-height: 25px;
    color: #272727;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }

  p {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: #00adef;
    margin: 0;
    padding: 0;
  }
`;

interface UserInfosProps {
  name: string;
  points: string;
}

export const UserInfos = ({ name, points }: UserInfosProps) => {
  return (
    <Wrapper>
      <h2>{name}</h2>
      <p>{points} pontos</p>
    </Wrapper>
  );
};
