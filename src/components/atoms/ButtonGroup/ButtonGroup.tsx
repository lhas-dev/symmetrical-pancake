import styled from "styled-components";

export const ButtonGroup = styled.div`
  background: #fff;
  padding: 16px;
  border-top: 1px solid #dddddd;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  bottom: 0;
  z-index: 998;

  @media (min-width: 50em) {
    background: transparent;
    flex-direction: row;
    gap: 16px;
    margin-top: 0;
    margin-bottom: 32px;
    border: none;

    button {
      width: auto;
    }
  }
`;
