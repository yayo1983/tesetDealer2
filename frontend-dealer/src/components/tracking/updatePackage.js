import { patch } from "../common";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const UpdatePackage = () => {
  const toast = useRef(null);
  const [IDText, setIDText] = useState("");
  const [address, setAddress] = useState("");
  const [errorID, setErrorID] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const statuses = [
    { name: "Aceptado", code: "A" },
    { name: "Entregado", code: "E" },
    { name: "En tránsito", code: "T" },
    { name: "Iniciado", code: "I" },
  ];

  const clearForm = (message) => {
    setIDText("");
    setAddress("");
    switchError(false);
    setSelectedStatus(null);
    showToast("success", "Success", message);
  };

  const switchError = (value) => {
    setErrorID(value);
    setErrorAddress(value);
    setErrorStatus(value);
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const validateIDInput = () => {
    if (IDText === null || IDText === "") {
      return false;
    }
    return true;
  };

  const validateAddress = () => {
    if (address === null || address === "") {
      return false;
    }
    return true;
  };

  const validateStatus = () => {
    if (selectedStatus === null || selectedStatus === "") {
      return false;
    }
    return true;
  };

  const updatePackage = async () => {
    try {
      if (validateIDInput() && validateAddress() && validateStatus()) {
        switchError(false);
        let data = {
          id: IDText,
        };
        let response = await patch("package/update", data);
        response = JSON.stringify(response);
        if (response.status !== 200) {
          showToast("error", "Error", "Error en la petición");
        } else {
          clearForm("Se ha realizado la actualización exitosamente");
        }
      } else {
        if (!validateIDInput()) {
          setErrorID(true);
        }
        if (!validateAddress()) {
          setErrorAddress(true);
        }
        if (!validateStatus()) {
          setErrorStatus(true);
        }
        showToast("error", "Error", "Revise el formulario");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Error en la petición");
    }
  };

  let classErrorID = errorID ? "p-invalid mr-2" : "";
  let classErrorAddress = errorAddress ? "p-invalid mr-2" : "";
  let classErrorStatus = errorStatus ? "w-full md:w-14rem p-invalid mr-2" : "w-full md:w-14rem";

  return (
    <>
      <Toast ref={toast} />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Actualizar paquete </h2>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-6	">
          <Panel header="Formulario para actualizar paquete">
            <div className="mb-3">
              Identificador:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={IDText}
                  className={classErrorID}
                  placeholder="Identificador"
                  tooltip="Identificador de paquete"
                  onChange={(e) => setIDText(e.target.value)}
                />
              </span>
              {errorID && (
                <Message
                  severity="error"
                  text="Debe especificar un identificador de paquete"
                />
              )}
            </div>
            <div className="mb-3">
              Lugar actual del paquete:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={address}
                  className={classErrorAddress}
                  placeholder="Lugar del paquete"
                  tooltip="Lugar o ubicación de paquete"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </span>
              {errorAddress && (
                <Message
                  severity="error"
                  text="Debe especificar el lugar del paquete"
                />
              )}
            </div>
            <div className="mb-3">
              Estado del paquete:
              <br />
              <span className="p-input-icon-left">
                <Dropdown
                  filter
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  options={statuses}
                  optionLabel="name"
                  placeholder="Seleccione un estado"
                />
              </span>
              {errorStatus && (
                <Message
                  severity="error"
                  text="Debe especificar el estado del paquete"
                />
              )}
            </div>
            <div className="flex flex-wrap align-items-center justify-content-left">
              <br />
              <Button
                label="Actualizar"
                icon="pi pi-check"
                onClick={updatePackage}
              />
            </div>
          </Panel>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
};

export default UpdatePackage;
