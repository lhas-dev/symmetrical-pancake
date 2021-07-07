import { Button } from "components/atoms/Button/Button";
import { Card, CardBody, CardDivider } from "components/atoms/Card/Card";
import { Checkbox } from "components/molecules/Checkbox/Checkbox";
import { Container } from "components/atoms/Container/Container";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { TextField } from "components/molecules/TextField/TextField";
import { Header } from "components/organisms/Header/Header";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SelectField } from "components/molecules/SelectField/SelectField";

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

const CEP_LENGTH = 9;

export const Address = () => {
  const [displayFields, setDisplayFields] = useState(false);
  const [addManually, setAddManually] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [zipcode, setZipcode] = useState("");

  const handleCheckbox = () => {
    setAgreement(!agreement);
  };
  const handleAddMore = () => {
    setAddManually(true);
    setDisplayFields(true);
  };
  const handleCEP = (event: any) => {
    const value = event.target.value;
    const isValid = value.length === CEP_LENGTH;

    if (!isValid) {
      return false;
    }

    setZipcode(value);
  };

  useEffect(() => {
    const isValid = zipcode.length === CEP_LENGTH;

    if (isValid) {
      setDisplayFields(true);
    }
  }, [zipcode]);
  
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
              <CardBody display="flex" flexDirection="column" gridGap="20px">
                <TextField
                  label="Informe um CEP"
                  placeholder="Digite aqui"
                  icon="SearchIcon"
                  onChange={handleCEP}
                  mask="99999-999"
                />
                {displayFields && (
                  <>
                    <SelectField label="Estado" options={[]} />
                    <SelectField label="Cidade" options={[]} />
                    <TextField label="Bairro" placeholder="Digite aqui" />
                    <TextField
                      label="Rua / Avenida"
                      placeholder="Digite aqui"
                    />
                    <TextField label="Número" placeholder="Digite aqui" />
                    <TextField label="Complemento" placeholder="Digite aqui" />
                  </>
                )}
              </CardBody>
              {!addManually && (
                <>
                  <CardDivider />
                  <CardBody>
                    <Button
                      label="Adicionar manualmente"
                      icon="AddMoreIcon"
                      onClick={handleAddMore}
                    />
                  </CardBody>
                </>
              )}
            </Card>
            <Checkbox
              label="Aceito compartilhar meu endereço com empresas parceiras"
              value={agreement}
              onChange={handleCheckbox}
            />
          </InnerContainer>
        </Container>
      </Wrapper>
    </>
  );
};
