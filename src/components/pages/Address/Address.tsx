import { Button } from "components/atoms/Button/Button";
import {
  Card,
  CardBody,
  CardDivider,
  Wrapper as CardWrapper,
} from "components/atoms/Card/Card";
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
  display: flex;
  flex-direction: column;

  ${CardWrapper} {
    align-self: flex-start;
  }

  @media (min-width: 992px) {
    flex-direction: row;
    gap: 50px;
  }
`;

export const Address = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <PageTitle
          maxWidth={[null, null, 310]}
          title="Qual o seu endereço?"
          description="Informe um CEP válido para buscarmos seu endereço, ou adicione-o manualmente."
          icon="QuestionIcon"
        />
        <Card mt={[24, 24, 0]} mb={16}>
          <CardBody>
            <TextField
              label="Informe um CEP"
              placeholder="Digite aqui"
              icon="SearchIcon"
            />
          </CardBody>
          <CardDivider />
          <CardBody>
            <Button label="Adicionar manualmente" icon="AddMoreIcon" />
          </CardBody>
        </Card>
      </Wrapper>
    </>
  );
};
