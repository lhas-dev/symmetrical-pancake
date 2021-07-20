import { Button } from "components/atoms/Button/Button";
import { ButtonGroup } from "components/atoms/ButtonGroup/ButtonGroup";
import { Card, CardBody, CardDivider } from "components/atoms/Card/Card";
import { ContainedButton } from "components/atoms/ContainedButton/ContainedButton";
import { Container } from "components/atoms/Container/Container";
import { Checkbox } from "components/molecules/Checkbox/Checkbox";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { SelectField } from "components/molecules/SelectField/SelectField";
import { TextField } from "components/molecules/TextField/TextField";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import orderBy from "lodash.orderby";
import { useEffect, useRef, useState } from "react";
import { Field } from "react-final-form";
import CitiesService from "services/CitiesService";
import StatesService from "services/StatesService";
import ZipcodeService from "services/ZipcodeService";
import { actions as flagsActions } from "store/slices/flags";
import { actions as loadingActions } from "store/slices/loading";
import styled from "styled-components";

const InnerContainer = styled.div`
  width: 100%;
  align-self: flex-start;
`;

const InnerContainerMargin = styled.div`
  padding: 16px;
`;

const CEP_LENGTH = 9;

export const AddressForm = ({ onSubmit, form }: any) => {
  const { batch, change } = form;

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [hasError, setHasError] = useState(false);

  const zipcodeRef = useRef<HTMLInputElement>();
  const isFormValid = zipcode.length === 9;

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading);
  const { displayFields, addManually, agreement } = useAppSelector(
    (state) => state.flags
  );

  const setFlagValue = (flag: string, value: boolean) =>
    dispatch(flagsActions.setFlagValue({ flag, value }));

  const handleZipcode = (event: any) => {
    const value = event.target.value;
    const isValid = value.length === CEP_LENGTH;

    if (!isValid) {
      return false;
    }

    setZipcode(value);
    setFlagValue("displayFields", true);
  };

  const handleCheckbox = () => {
    setFlagValue("agreement", !agreement);
  };

  const handleAddMore = () => {
    setFlagValue("addManually", true);
    setFlagValue("displayFields", true);
  };

  const handleCancel = () => {
    setZipcode("");
    setHasError(false);
    setCities([]);
    dispatch(flagsActions.clear());
    form.reset();

    const zipcodeElement = zipcodeRef.current;

    if (zipcodeElement) {
      zipcodeElement.value = "";
    }
  };

  useEffect(() => {
    if (!zipcode) return;

    const cb = async () => {
      dispatch(loadingActions.show());
      const data = await ZipcodeService.get(zipcode);
      dispatch(loadingActions.hide());
      setHasError(data.erro ? true : false);

      if (data.erro || addManually) {
        return false;
      }

      const uf: any = states.find((item: any) => item.value === data.uf);

      const citiesRequest = await CitiesService.getAll(uf.id);
      const citiesResponse = citiesRequest.map((cidade: any) => ({
        id: cidade.id,
        label: cidade.nome,
        value: cidade.id,
      }));
      const city = citiesResponse.find(
        (item: {label: string;}) => item.label === data.localidade
      );

      setCities(citiesResponse);

      batch(() => {
        change("address", data.logradouro);
        change("neighbourhood", data.bairro);
        change("state", data.uf);
        change("city", city.id);
      });
    };

    cb();
  }, [zipcode, dispatch, addManually, states, batch, change]);

  const onDidMount = async () => {
    const request = await StatesService.getAll();
    const response: any = orderBy(
      request.map((uf: { id: number; nome: string; sigla: string;}) => ({
        id: uf.id,
        label: uf.nome,
        value: uf.sigla,
      })),
      ["label"],
      ["asc"]
    );

    setStates(response);
  };

  useEffect(() => {
    onDidMount();
  }, []);

  return (
    <form onSubmit={onSubmit}>
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
                  loading={loading}
                  icon="SearchIcon"
                  onChange={handleZipcode}
                  mask="99999-999"
                  innerRef={zipcodeRef}
                  error={
                    hasError ? "CEP inválido. Por favor, verifique." : ""
                  }
                />
                {displayFields && (
                  <>
                    <Field
                      name="state"
                      render={({ input }) => (
                        <SelectField
                          label="Estado (UF)"
                          options={states}
                          {...input}
                        />
                      )}
                    />
                    <Field
                      name="city"
                      render={({ input }) => (
                        <SelectField
                          label="Cidade"
                          options={cities}
                          {...input}
                        />
                      )}
                    />
                    <Field
                      name="neighbourhood"
                      render={({ input }) => (
                        <TextField label="Bairro" {...input} />
                      )}
                    />
                    <Field
                      name="address"
                      render={({ input }) => (
                        <TextField label="Rua / Avenida" {...input} />
                      )}
                    />
                    <Field
                      name="number"
                      render={({ input }) => (
                        <TextField label="Número" {...input} />
                      )}
                    />
                    <Field
                      name="complement"
                      render={({ input }) => (
                        <TextField label="Complemento" {...input} />
                      )}
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
              onClick={onSubmit}
            />
            <ContainedButton label="Cancelar" onClick={handleCancel} />
          </ButtonGroup>
        </InnerContainer>
      </Container>
    </form>
  );
};
