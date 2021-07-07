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
import ZipcodeService from "services/ZipcodeService";
import StatesService from "services/StatesService";

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
  // Flags
  const [displayFields, setDisplayFields] = useState(false);
  const [addManually, setAddManually] = useState(false);
  const [agreement, setAgreement] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // Zipcode
  const [zipcode, setZipcode] = useState("");
  const [showZipcodeWarning, setShowZipcodeWarning] = useState(false);
  const [zipcodeData, setZipcodeData] = useState({
    logradouro: "",
    bairro: "",
    uf: "",
  });

  // Select fields
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Address fields
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");

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

    const cb = async () => {
      setLoading(true);
      const data = await ZipcodeService.get(zipcode);
      console.log(data);
      setLoading(false);
      setShowZipcodeWarning(data.erro ? true : false);

      if (data.erro) {
        return false;
      }

      setZipcodeData(data);
    };

    if (isValid) {
      setDisplayFields(true);

      cb();
    }
  }, [zipcode]);

  useEffect(() => {
    const { logradouro, bairro, uf } = zipcodeData;

    if (!zipcodeData.logradouro) {
      return;
    }

    setAddress(logradouro);
    setNeighbourhood(bairro);
    setState(uf);
  }, [zipcodeData, states]);

  useEffect(() => {
    const cb = async () => {
      const ufsData = await StatesService.getAll();
      const formattedStates = ufsData.map((uf: any) => ({
        id: uf.id,
        label: uf.nome,
        value: uf.sigla,
      }));
      console.log(ufsData);

      setStates(formattedStates);
    };

    cb();
  }, []);

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
                  loading={loading}
                  icon="SearchIcon"
                  onChange={handleCEP}
                  mask="99999-999"
                  error={
                    showZipcodeWarning
                      ? "CEP inválido. Por favor, verifique."
                      : ""
                  }
                />
                {displayFields && (
                  <>
                    <SelectField
                      label="Estado"
                      options={states}
                      value={state}
                      onChange={(event) => setState(event.currentTarget.value)}
                    />
                    <SelectField label="Cidade" options={cities} />
                    <TextField
                      label="Bairro"
                      placeholder="Digite aqui"
                      value={neighbourhood}
                      onChange={(event) =>
                        setNeighbourhood(event.currentTarget.value)
                      }
                    />
                    <TextField
                      label="Rua / Avenida"
                      placeholder="Digite aqui"
                      value={address}
                      onChange={(event) =>
                        setAddress(event.currentTarget.value)
                      }
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
