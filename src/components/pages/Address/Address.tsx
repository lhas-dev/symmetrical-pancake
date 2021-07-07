import { Button } from "components/atoms/Button/Button";
import {
  Card,
  CardBody,
  CardDivider,
  Wrapper as CardWrapper,
} from "components/atoms/Card/Card";
import { Checkbox } from "components/molecules/Checkbox/Checkbox";
import { Container } from "components/atoms/Container/Container";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { TextField } from "components/molecules/TextField/TextField";
import { Header } from "components/organisms/Header/Header";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  background: #f5f5f5;
  min-height: calc(100vh - 56px);
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;

  ${Container} {
    flex-direction: column;

    @media (min-width: 52em) {
      flex-direction: row;
      gap: 50px;
    }
  }
`;

const InnerContainer = styled.div`
width: 100%;
  align-self: flex-start;
`;

export const Address = () => {
  const [agreement, setAgreement] = useState(false);

  const handleCheckbox = () => {
    setAgreement(true);
  };
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
          <InnerContainer>
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
              <Checkbox label="Aceito compartilhar meu endereço com empresas parceiras" value={agreement} onChange={handleCheckbox} />
          </InnerContainer>
        </Container>
      </Wrapper>
    </>
  );
};
