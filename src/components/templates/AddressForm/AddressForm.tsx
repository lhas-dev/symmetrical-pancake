import { Button } from "components/atoms/Button/Button";
import { ButtonGroup } from "components/atoms/ButtonGroup/ButtonGroup";
import { Card, CardBody, CardDivider } from "components/atoms/Card/Card";
import { ContainedButton } from "components/atoms/ContainedButton/ContainedButton";
import { Container } from "components/atoms/Container/Container";
import { Checkbox } from "components/molecules/Checkbox/Checkbox";
import { PageTitle } from "components/molecules/PageTitle/PageTitle";
import { SelectField } from "components/molecules/SelectField/SelectField";
import { TextField } from "components/molecules/TextField/TextField";
import {
  useAppDispatch,
  useAppSelector,
  useCities,
  useZipcode,
} from "hooks";
import { useEffect, useRef, useState } from "react";
import { actions } from "store/slices";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";

const InnerContainer = styled.div`
  width: 100%;
  align-self: flex-start;
`;

const InnerContainerMargin = styled.div`
  padding: 16px;
`;

const CEP_LENGTH = 9;

export const AddressForm = () => {
  // Hooks
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset
  } = useForm();
  const { fetchZipcode, hasError, setHasError } = useZipcode();
  const { fetchCities } = useCities();

  // States
  const [zipcode, setZipcode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const watchAllFields = watch();

  // Store
  const dispatch = useAppDispatch();
  const { states, cities } = useAppSelector((state) => state.locations);
  const loading = useAppSelector((state) => state.loading);
  const { displayFields, addManually, agreement } = useAppSelector(
    (state) => state.flags
  );

  // Refs
  const zipcodeRef = useRef<any>();


  // Events
  const setFlagValue = (flag: string, value: boolean) =>
    dispatch(actions.flags.setFlagValue({ flag, value }));

  const handleZipcodeChange = (event: any) => {
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

  const handleAddManually = () => {
    setFlagValue("addManually", true);
    setFlagValue("displayFields", true);
  };

  // Form submission
  const onSubmit = () => {
    dispatch(actions.modal.show(agreement ? "success" : "error"));
  };
  
  // Form cancel
  const onCancel = () => {
    setZipcode("");
    setHasError(false);
    dispatch(
      actions.locations.setLocationValue({ location: "cities", value: [] })
    );
    dispatch(actions.flags.clear());
    reset();

    if (zipcodeRef.current) {
      zipcodeRef.current.value = "";
    }
  };

  // When zipcode is updated
  const handleZipcodeUpdate = () => {
    if (!zipcode) return;

    const cb = async () => {
      const data = await fetchZipcode(zipcode);
      const uf = states.find((item: any) => item.value === data.uf);
      const city = await fetchCities(uf, data);

      setValue("address", data.logradouro);
      setValue("neighbourhood", data.bairro);
      setValue("state", data.uf);
      setValue("city", city.id);
    };

    cb();
  }
  useEffect(handleZipcodeUpdate, [zipcode, states, fetchCities, fetchZipcode, setValue]);

  // Validation
  const handleValidation = () => {
    const { address, number, neighbourhood, city, state } = watchAllFields;
    const isValid = address && number && neighbourhood && city && state && zipcode.length === CEP_LENGTH;

    setIsValid(isValid);
  }

  useEffect(handleValidation, [watchAllFields, zipcode]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={handleZipcodeChange}
                  mask="99999-999"
                  ref={zipcodeRef}
                  error={hasError ? "CEP inválido. Por favor, verifique." : ""}
                />
                {displayFields && (
                  <>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="Estado (UF)"
                          options={states}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <SelectField
                          label="Cidade"
                          options={cities}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="neighbourhood"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (<TextField label="Bairro" {...field} />)}
                    />
                    
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField label="Rua / Avenida" {...field} />
                    )}
                  />
                  <Controller
                    name="number"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField label="Número" {...field} />
                    )}
                  />
                    <Controller
                    name="complement"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField label="Complemento" {...field} />
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
                      onClick={handleAddManually}
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
              disabled={!isValid}
              type="submit"
            />
            <ContainedButton label="Cancelar" onClick={onCancel} />
          </ButtonGroup>
        </InnerContainer>
      </Container>
    </form>
  );
};
