import { Container } from "components/atoms/Container/Container";
import { AddressForm } from "components/organisms/AddressForm";
import { Header } from "components/organisms/Header/Header";
import { ErrorStateModal } from "components/templates/ErrorStateModal/ErrorStateModal";
import { SuccessStateModal } from "components/templates/SuccessStateModal/SuccessStateModal";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useState } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";

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
  const dispatch = useAppDispatch();

  // Flags
  const { agreement } = useAppSelector((state) => state.flags);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState("");

  const onSubmit = () => {
    setShowModal(true);
    setModalState(agreement ? "success" : "error");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <SuccessStateModal
        visible={showModal && modalState === "success"}
        onClose={handleModalClose}
      />
      <ErrorStateModal
        visible={showModal && modalState === "error"}
        onClose={handleModalClose}
      />
      <Wrapper>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => (
            <AddressForm onSubmit={handleSubmit} form={form} />
          )}
        />
      </Wrapper>
      . ;33
    </>
  );
};
