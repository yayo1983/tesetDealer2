import { post } from "../common";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import React, { useState, useRef } from "react";

const RegisterPackage = () => {
  const toast = useRef(null);
  const [size, setSize] = useState(0);
  const [description, setDescription] = useState("");
  const [addressOrigin, setAddressOrigin] = useState("");
  const [addressDestination, setAddressDestination] = useState("");
  const [email, setEmail] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorSize, setErrorSize] = useState(false);
  const [errorAddressOrigin, setErrorAddressOrigin] = useState(false);
  const [errorAddressDestination, setErrorAddressDestination] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const clearForm = (message) => {
    setDescription("");
    setSize(0);
    setAddressOrigin("");
    setAddressDestination("");
    setEmail("");
    switchError(false);
    showToast("success", "Success", message);
  };

  const switchError = (value) =>{
    setErrorDescription(value);
    setErrorSize(value);
    setErrorAddressOrigin(value);
    setErrorAddressDestination(value);
    setErrorEmail(value);
  }

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const validateDescriptionInput = () => {
    if (description === null || description === "") {
      return false;
    }
    return true;
  };

  const validateSizeInput = () => {
    if (typeof size != "number" || size <= 0) {
      return false;
    }
    return true;
  };

  const validateAddressOriginInput = () => {
    if (addressOrigin === null || addressOrigin === "") {
      return false;
    }
    return true;
  };

  const validateAddressDestinationInput = () => {
    if (addressDestination === null || addressDestination === "") {
      return false;
    }
    return true;
  };

  const validateEmailInput = () => {
    if (addressDestination === null || addressDestination === "") {
      return false;
    }
    return true;
  };

  const registerPackage = async () => {
    try {
      if (
        validateDescriptionInput() &&
        validateSizeInput() &&
        validateAddressOriginInput() &&
        validateAddressDestinationInput() &&
        validateEmailInput()
      ) {
        switchError(false);
        let data = {
          description: description,
          size: size,
          addressOrigin: addressOrigin,
          addressDestination: addressDestination,
          email: email,
        };
        let response = await post("package/create", data);
        response = JSON.stringify(response);
        if (response.status !== 200) {
          showToast("error", "Error", "Error en la petición");
        } else {
          clearForm("Se ha realizado el registro exitosamente");
        }
      } else {
        if (!validateDescriptionInput()) {
          setErrorDescription(true);
        }
        if (!validateSizeInput()) {
          setErrorSize(true);
        }
        if (!validateAddressOriginInput()) {
          setErrorAddressOrigin(true);
        }
        if (!validateAddressDestinationInput()) {
          setErrorAddressDestination(true);
        }
        if (!validateEmailInput()) {
          setErrorEmail(true);
        }
        showToast("error", "Error", "Error en el formulario");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Error en la petición");
    }
  };

  let classErrorDescription = errorDescription ? "p-invalid mr-2" : "";
  let classErrorSize = errorSize ? "p-invalid mr-2" : "";
  let classErrorAddressOrigin = errorAddressOrigin ? "p-invalid mr-2" : "";
  let classErrorAddresDestination = errorAddressDestination
    ? "p-invalid mr-2"
    : "";
  let classErrorEmail = errorEmail ? "p-invalid mr-2" : "";

  return (
    <>
      <Toast ref={toast} />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Registrar paquete</h2>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-6	">
          <Panel header="Formulario de registro">
            <div className="mb-3">
              Descripción:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={description}
                  placeholder="Descripción"
                  className={classErrorDescription}
                  tooltip="Descripción del paquete"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
              {errorDescription && (
                <Message
                  severity="error"
                  text="Error en el campo de descripción del paquete"
                />
              )}
            </div>
            <div className="mb-3">
              Tamaño:
              <br />
              <span className="p-input-icon-left">
                <InputNumber
                  min={1}
                  max={1000000000}
                  required
                  showButtons
                  value={size}
                  mode="decimal"
                  placeholder="Tamaño"
                  maxFractionDigits={5}
                  className={classErrorSize}
                  tooltip="Tamaño del paquete"
                  onValueChange={(e) => setSize(e.target.value)}
                />
              </span>
              {errorSize && (
                <Message
                  severity="error"
                  text="Error en el campo tamaño del paquete"
                />
              )}
            </div>
            <div className="mb-3">
              Dirección de origen:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={addressOrigin}
                  placeholder="Dirección de origen"
                  className={classErrorAddressOrigin}
                  tooltip="Dirección de origen donde se entregó el paquete"
                  onChange={(e) => setAddressOrigin(e.target.value)}
                />
              </span>
              {errorAddressOrigin && (
                <Message
                  severity="error"
                  text="Error en el campo dirección de origen"
                />
              )}
            </div>
            <div className="mb-3">
              Dirección de destino:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={addressDestination}
                  placeholder="Dirección de destino"
                  className={classErrorAddresDestination}
                  tooltip="Dirección de destino donde se entregó el paquete"
                  onChange={(e) => setAddressDestination(e.target.value)}
                />
              </span>
              {errorAddressDestination && (
                <Message
                  severity="error"
                  text="Error en el campo dirección de destino"
                />
              )}
            </div>
            <div className="mb-3">
              Correo del receptador del paquete:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={email}
                  placeholder="Correo"
                  className={classErrorEmail}
                  tooltip="Correo de la persona que recibe el paquete"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              {errorEmail && (
                <Message severity="error" text="Error en el campo correo" />
              )}
            </div>
            <div className="flex flex-wrap align-items-center justify-content-left">
              <Button
                label="Registrar"
                icon="pi pi-check"
                onClick={registerPackage}
              />
            </div>
          </Panel>
          <div className="col-sm-4"></div>
        </div>
      </div>
      <br />
    </>
  );
};

export default RegisterPackage;
