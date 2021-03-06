import { Container } from "components/atoms/Container/Container";
import { AddressForm } from "components/templates/AddressForm/AddressForm";
import { Header } from "components/organisms/Header/Header";
import { ErrorStateModal } from "components/templates/ErrorStateModal/ErrorStateModal";
import { SuccessStateModal } from "components/templates/SuccessStateModal/SuccessStateModal";
import { useAppSelector } from "hooks/useAppSelector";
import styled from "styled-components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { actions } from "store/slices";
import { useStates } from "hooks";

const Wrapper = styled.main`
  background: #f5f5f5;
  min-height: calc(100vh - 56px);
  padding-top: 24px;

  ${Container} {
    flex-direction: column;

    @media (min-width: 52em) {
      flex-direction: row;
      gap: 50px;
    }
  }
`;

export const Address = () => {
  useStates();
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const handleModalClose = () => {
    dispatch(actions.modal.hide());
  };

  return (
    <>
      <Header />
      <SuccessStateModal
        visible={modal.visible && modal.kind === "success"}
        onClose={handleModalClose}
      />
      <ErrorStateModal
        visible={modal.visible && modal.kind === "error"}
        onClose={handleModalClose}
      />
      <Wrapper>
        <AddressForm />
      </Wrapper>
    </>
  );
};
