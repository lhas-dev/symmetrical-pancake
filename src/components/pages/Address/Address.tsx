import { Container } from "components/atoms/Container/Container";
import { AddressForm } from "components/templates/AddressForm/AddressForm";
import { Header } from "components/organisms/Header/Header";
import { ErrorStateModal } from "components/templates/ErrorStateModal/ErrorStateModal";
import { SuccessStateModal } from "components/templates/SuccessStateModal/SuccessStateModal";
import { useAppSelector } from "hooks/useAppSelector";
import { useState } from "react";
import { Form } from "react-final-form";
import styled from "styled-components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { actions as modalActions } from "store/slices/modal";

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
  const flags = useAppSelector((state) => state.flags);
  const modal = useAppSelector((state) => state.modal);

  const onSubmit = () => {
    dispatch(modalActions.show(flags.agreement ? "success" : "error"));
  };

  const handleModalClose = () => {
    dispatch(modalActions.hide());
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
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => (
            <AddressForm onSubmit={handleSubmit} form={form} />
          )}
        />
      </Wrapper>
    </>
  );
};
