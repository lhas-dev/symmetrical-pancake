import styled from "styled-components";

const Wrapper = styled.div`
  background: rgba(229, 229, 229, 0.75);
  padding: 16px;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const InnerContainer = styled.div`
  background: #ffffff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  max-width: 584px;
  margin: 0 auto;
  text-align: center;
`;

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
}

export const Modal = ({ visible, children }: ModalProps) => {
  if (!visible) {
    return <div />;
  }

  return (
    <Wrapper>
      <InnerContainer>{children}</InnerContainer>
    </Wrapper>
  );
};
