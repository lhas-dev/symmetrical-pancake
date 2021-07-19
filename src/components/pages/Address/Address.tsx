
import { Button } from "components/atoms/Button/Button";
import { ButtonGroup } from "components/atoms/ButtonGroup/ButtonGroup";
import { Card, CardBody, CardDivider } from "components/atoms/Card/Card";
import { ContainedButton } from "components/atoms/ContainedButton/ContainedButton";
import { Container } from "components/atoms/Container/Container";
import { Checkbox } from "components/molecules/Checkbox/Checkbox";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { SelectField } from "components/molecules/SelectField/SelectField";
import { TextField } from "components/molecules/TextField/TextField";
import { Header } from "components/organisms/Header/Header";
import { ErrorStateModal } from "components/templates/ErrorStateModal/ErrorStateModal";
import { SuccessStateModal } from "components/templates/SuccessStateModal/SuccessStateModal";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { usePreviousValue } from "hooks/usePreviousValue";
import isEqual from "lodash.isequal";
import orderBy from "lodash.orderby";
import { useEffect, useRef, useState } from "react";
import CitiesService from "services/CitiesService";
import StatesService from "services/StatesService";
import ZipcodeService from "services/ZipcodeService";
import { actions as flagsActions } from "store/slices/flags";
import { actions as loadingActions } from "store/slices/loading";
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

const InnerContainer = styled.div`
  width: 100%;
  align-self: flex-start;
`;

const InnerContainerMargin = styled.div`
  padding: 16px;
`;

const CEP_LENGTH = 9;

export const Address = () => {
  const dispatch = useAppDispatch();

  // Flags
  const { displayFields, addManually, agreement } = useAppSelector(
    (state) => state.flags
  );
  const setFlagValue = (flag: string, value: boolean) =>
    dispatch(flagsActions.setFlagValue({ flag, value }));

  // Loading
  const loading = useAppSelector((state) => state.loading);
  const showLoading = () => dispatch(loadingActions.show());
  const hideLoading = () => dispatch(loadingActions.hide());

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
  // const {
  //   state,
  //   city,
  //   address,
  //   neighbourhood,
  //   number,
  //   complement,
  // } = useAppSelector((state) => state.form);
  // const setFormValue = (field: string, value: string) =>
  //   dispatch(formActions.setFormValue({ field, value }));
  // const setFormValues = (payload: Partial<FormState>) =>
  //   dispatch(formActions.setFormValues(payload));

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState("");

  const handleCheckbox = () => {
    setFlagValue("agreement", !agreement);
  };

  const handleAddMore = () => {
    setFlagValue("addManually", true);
    setFlagValue("displayFields", true);
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
    setZipcode("");
    setShowZipcodeWarning(false);
    setZipcodeData({
      logradouro: "",
      bairro: "",
      uf: "",
      localidade: "",
    });
    setCities([]);
    dispatch(flagsActions.clear());
    // dispatch(formActions.clear());

    const zipcodeElement = zipcodeRef.current;

    if (zipcodeElement) {
      zipcodeElement.value = "";
    }
  };

  useEffect(() => {
    const isValid = zipcode.length === CEP_LENGTH && !addManually;

    const cb = async () => {
      showLoading();
      const data = await ZipcodeService.get(zipcode);
      hideLoading();
      setShowZipcodeWarning(data.erro ? true : false);

      if (data.erro) {
        return false;
      }

      setZipcodeData(data);
    };

    if (isValid) {
      setFlagValue("displayFields", true);

      cb();
    }
  }, [zipcode, addManually]);

  useEffect(() => {
    const { logradouro, bairro, uf } = zipcodeData;

    if (!zipcodeData.logradouro) {
      return;
    }

    // setFormValues({
    //   address: logradouro,
    //   neighbourhood: bairro,
    //   state: uf,
    // });
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
      // const stateObject: any = states.find((item: any) => item.value === state);
      // const ufId = stateObject?.id;
      // const isNotValid =
      //   !isEqual(previousZipcodeData, zipcodeData) ||
      //   !ufId ||
      //   states.length === 0;

      // if (isNotValid) {
      //   return;
      // }

      // const request = await CitiesService.getAll(ufId);
      // const formattedCities = request.map((cidade: any) => ({
      //   id: cidade.id,
      //   label: cidade.nome,
      //   value: cidade.id,
      // }));
      // setCities(formattedCities);

      // const city = request.find(
      //   (item: any) => item.nome === zipcodeData.localidade
      // );

      // if (!city) {
      //   return;
      // }

      // setFormValue("city", city.id);
    };

    cb();
  }, [previousZipcodeData, states, zipcodeData]);

  const isFormValid =
    zipcode.length === 9;

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
            mt={[null, null, 40]}
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
                      {/* <SelectField
                        label="Estado"
                        options={states}
                        value={state}
                        onChange={(event) =>
                          setFormValue("state", event.currentTarget.value)
                        }
                      />
                      <SelectField
                        label="Cidade"
                        options={cities}
                        value={city}
                        onChange={(event) => setFormValue("city", event.currentTarget.value)}
                      />
                      <TextField
                        label="Bairro"
                        placeholder="Digite aqui"
                        value={neighbourhood}
                        onChange={(event) =>
                          setFormValue("neighbourhood", event.currentTarget.value)
                        }
                      />
                      <TextField
                        label="Rua / Avenida"
                        placeholder="Digite aqui"
                        value={address}
                        onChange={(event) =>
                          setFormValue("address", event.currentTarget.value)
                        }
                      />
                      <TextField
                        label="Número"
                        placeholder="Digite aqui"
                        value={number}
                        onChange={(event) =>
                          setFormValue("number", event.currentTarget.value)
                        }
                      />
                      <TextField
                        label="Complemento"
                        placeholder="Digite aqui"
                        value={complement}
                        onChange={(event) =>
                          setFormValue("complement", event.currentTarget.value)
                        }
                      /> */}
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
