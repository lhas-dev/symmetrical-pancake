import styled from "styled-components";

const Wrapper = styled.div`
  background: rgba(229, 229, 229, 0.75);
  padding: 16px;

  @media (min-width: 52em) {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

const InnerContainer = styled.div`
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
`;

interface ModalProps {
  visible: boolean;
}

export const Modal = ({ visible }: ModalProps) => {
  if (!visible) {
    return <div />;
  }

  return (
    <Wrapper>
      <InnerContainer>ae</InnerContainer>
    </Wrapper>
  );
};
