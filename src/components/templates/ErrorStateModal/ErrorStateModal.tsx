import { Modal } from "components/organisms/Modal/Modal";
import { Icon } from "components/atoms/Icon/Icon";
import styled from "styled-components";
import { ContainedButton } from "components/atoms/ContainedButton/ContainedButton";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: "Open Sans";
  flex-wrap: wrap;
  align-items: center;

  h3 {
    font-size: 18px;
    line-height: 25px;
    font-weight: 500;
    color: #272727;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 19px;
    color: #898989;
  }

  button {
    width: auto;
    padding-left: 28px;
    padding-right: 28px;
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

interface ErrorStateModalProps {
  visible: boolean;
  onClose: () => {};
}

export const ErrorStateModal = ({ visible, onClose }: ErrorStateModalProps) => {
  return (
    <Modal visible={visible}>
      <Wrapper>
        <Icon src="FailureIllustration" />
        <h3>Tivemos um problema!</h3>
        <p>
          Não foi possível cadastrar seu novo endereço neste momento. Tente
          novamente mais tarde.
        </p>
        <ContainedButton label="Voltar" onClick={onClose} />
      </Wrapper>
    </Modal>
  );
};
