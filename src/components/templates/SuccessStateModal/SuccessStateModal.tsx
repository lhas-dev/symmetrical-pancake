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

interface SuccessStateModalProps {
  visible: boolean;
  onClose: () => any;
}

export const SuccessStateModal = ({
  visible,
  onClose,
}: SuccessStateModalProps) => {
  return (
    <Modal visible={visible}>
      <Wrapper>
        <Icon src="SuccessIllustration" />
        <h3>Novo endereço cadastrado!</h3>
        <p>Seu novo endereço já pode ser utilizado para suas entregas.</p>
        <ContainedButton label="Concluir" onClick={onClose} />
      </Wrapper>
    </Modal>
  );
};
