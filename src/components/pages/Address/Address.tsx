import { Button } from "components/atoms/Button/Button";
import { Card, CardBody, CardDivider } from "components/atoms/Card/Card";
import { Checkbox } from "components/molecules/Checkbox/Checkbox";
import { Container } from "components/atoms/Container/Container";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { TextField } from "components/molecules/TextField/TextField";
import { Header } from "components/organisms/Header/Header";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SelectField } from "components/molecules/SelectField/SelectField";
import ZipcodeService from "services/ZipcodeService";
import StatesService from "services/StatesService";
import CitiesService from "services/CitiesService";
import { ContainedButton } from "components/atoms/ContainedButton/ContainedButton";
import { SuccessStateModal } from "components/templates/SuccessStateModal/SuccessStateModal";
import { ErrorStateModal } from "components/templates/ErrorStateModal/ErrorStateModal";
import { usePreviousValue } from "hooks/usePreviousValue";
import isEqual from "lodash.isequal";
import orderBy from "lodash.orderby";
import { ButtonGroup } from "components/atoms/ButtonGroup/ButtonGroup";

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

const InnerContainer = styled.div`
  width: 100%;
  align-self: flex-start;
`;

const InnerContainerMargin = styled.div`
  padding: 16px;
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
    localidade: "",
  });
  const previousZipcodeData = usePreviousValue(zipcodeData);
  const zipcodeRef = useRef<HTMLInputElement>();

  // Select fields
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Address fields
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState("");

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

  const handleCancel = () => {
    setDisplayFields(false);
    setAddManually(false);
    setAgreement(false);
    setZipcode("");
    setShowZipcodeWarning(false);
    setZipcodeData({
      logradouro: "",
      bairro: "",
      uf: "",
      localidade: "",
    });
    setCities([]);
    setState("");
    setCity("");
    setAddress("");
    setNeighbourhood("");

    const zipcodeElement = zipcodeRef.current;

    if (zipcodeElement) {
      zipcodeElement.value = "";
    }
  };

  useEffect(() => {
    const isValid = zipcode.length === CEP_LENGTH && !addManually;

    const cb = async () => {
      setLoading(true);
      const data = await ZipcodeService.get(zipcode);
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
  }, [zipcode, addManually]);

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
      const request = await StatesService.getAll();
      const formattedStates = request.map((uf: any) => ({
        id: uf.id,
        label: uf.nome,
        value: uf.sigla,
      }));
      const orderedStates: any = orderBy(formattedStates, ["label"], ["asc"]);

      setStates(orderedStates);
    };

    cb();
  }, []);

  useEffect(() => {
    const cb = async () => {
      
      const stateObject: any = states.find((item: any) => item.value === state);
      const ufId = stateObject?.id;
      const isNotValid = !isEqual(previousZipcodeData, zipcodeData) || !ufId || states.length === 0;

      if (isNotValid) {
        return;
      }

      const request = await CitiesService.getAll(ufId);
      const formattedCities = request.map((cidade: any) => ({
        id: cidade.id,
        label: cidade.nome,
        value: cidade.id,
      }));
      setCities(formattedCities);


      const city = request.find(
        (item: any) => item.nome === zipcodeData.localidade
      );
    

      if (!city) {
        return;
      }

      setCity(city.id);
    };

    cb();
  }, [previousZipcodeData, state, states, zipcodeData]);

  const isFormValid =
    zipcode.length === 9 && state && city && address && number;

  const handleSubmit = () => {
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
        <Container>
          <PageTitle
            maxWidth={[null, null, 310]}
            title="Qual o seu endereço?"
            description="Informe um CEP válido para buscarmos seu endereço, ou adicione-o manualmente."
            icon="QuestionIcon"
          />
          <InnerContainer>
            <InnerContainerMargin>
                <Card mt={[24, 24, 0]} mb={[16, 16, 32]}>
                  <CardBody display="flex" flexDirection="column" gridGap="20px">
                    <TextField
                      label="Informe um CEP"
                      placeholder="Digite aqui"
                      loading={loading}
                      icon="SearchIcon"
                      onChange={handleCEP}
                      mask="99999-999"
                      innerRef={zipcodeRef}
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
                          onChange={(event) =>
                   
                                setState(event.currentTarget.value)
                        
                        }
                        />
                        <SelectField
                          label="Cidade"
                          options={cities}
                          value={city}
                          onChange={(event) => setCity(event.currentTarget.value)}
                        />
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
                        <TextField
                          label="Número"
                          placeholder="Digite aqui"
                          value={number}
                          onChange={(event) =>

                                                   setNumber(event.currentTarget.value)
                        
                        }
                        />
                        <TextField
                          label="Complemento"
                          placeholder="Digite aqui"
                          value={complement}
                          onChange={(event) =>
                            setComplement(event.currentTarget.value)
                          }
                        />
                      </>
                    )}
                  </CardBody>
                  {!addManually && zipcode.length !== CEP_LENGTH && (
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
            </InnerContainerMargin>
            <ButtonGroup>
              <ContainedButton
                label="Salvar"
                variant="primary"
                disabled={!isFormValid}
                onClick={handleSubmit}
              />
              <ContainedButton label="Cancelar" onClick={handleCancel} />
            </ButtonGroup>
          </InnerContainer>
        </Container>
      </Wrapper>
    </>
  );
};
