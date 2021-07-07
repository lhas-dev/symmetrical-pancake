import { Button } from "components/atoms/Button/Button";
import {
  Card,
  CardBody,
  CardDivider,
  Wrapper as CardWrapper,
} from "components/atoms/Card/Card";
import { Container } from "components/atoms/Container/Container";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { TextField } from "components/molecules/TextField/TextField";
import { Header } from "components/organisms/Header/Header";
import styled from "styled-components";

const Wrapper = styled.main`
  background: #f5f5f5;
  min-height: calc(100vh - 56px);
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;

  ${CardWrapper} {
    align-self: flex-start;
  }

  ${Container} {
    flex-direction: column;

    @media (min-width: 52em) {
      flex-direction: row;
      gap: 50px;
    }
  }
`;

export const Address = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
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
        </Container>
      </Wrapper>
    </>
  );
};
