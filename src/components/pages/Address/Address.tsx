import { Card, CardBody, CardDivider } from "components/atoms/Card/Card";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { TextField } from "components/molecules/TextField/TextField";
import { Header } from "components/organisms/Header/Header";
import styled from "styled-components";

const Wrapper = styled.main`
  background: #f5f5f5;
  min-height: 100vh;
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Address = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <PageTitle
          title="Qual o seu endereço?"
          description="Informe um CEP válido para buscarmos seu endereço, ou adicione-o manualmente."
          icon="QuestionIcon"
        />
        <Card mt={24} mb={16}>
          <CardBody>
            <TextField
              label="Informe um CEP"
              placeholder="Digite aqui"
              icon="SearchIcon"
            />
          </CardBody>
          <CardDivider />
          <CardBody>botão aqui</CardBody>
        </Card>
      </Wrapper>
    </>
  );
};
