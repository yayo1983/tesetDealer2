import { post } from "../common";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";

const TrackingPackages = () => {
  const toast = useRef(null);
  const [IDText, setIDText] = useState('');
  const [error, setError] = useState(false);
  const [trackings, setTrackings] = useState([]);

  const clearForm = (message) => {
    setIDText('');
    setError(false);
    showToast("success", "Success", message);
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

  const getTrackings = async () => {
    try {
      if (validateIDInput()) {
        setError(false);
        let data = {
          id: IDText,
        };
        let response = await post("package/report", data);
        response = JSON.stringify(response);
        if (response.status !== 200) {
          showToast("error", "Error", "Error en la petición");
        } else {
          clearForm("Se ha realizado la petición exitosamente");
        }
      } else {
        setError(true);
        showToast("error", "Error", "Debe seleccionar una fecha");
      }
    } catch (error) {
      console.log(error);
      setTrackings([]);
      showToast("error", "Error", "Error en la petición");
    }
  };

  let classError = error ? "p-invalid mr-2" : "";

  return (
    <>
      <Toast ref={toast} />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Estado del rastreo </h2>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-6	">
          <Panel header="Formulario para rastrear paquete">
            Identificador:
            <br />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Search"
                value={IDText}
                onChange={(e) => setIDText(e.target.value)}
                required
                className={classError}
                tooltip="Identificador de paquete"
              />
            </span>
            {error && <Message severity="error" text="Debe especificar un identificador de paquete" />}
            <div className="flex flex-wrap align-items-center justify-content-left">
              <br />
              <Button
                label="Buscar"
                icon="pi pi-check"
                onClick={getTrackings}
              />
            </div>
          </Panel>
          <div className="col-sm-4"></div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-6">
          <DataTable value={trackings} responsiveLayout="scroll">
            <Column field="package_id" header="Identificador"></Column>
            <Column field="status" header="Estado por ubicación"></Column>
            <Column field="date" header="Fecha"></Column>
            <Column field="address" header="Ubicación"></Column>
            <Column field="type" header="Tipo de ubicación"></Column>
          </DataTable>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};

export default TrackingPackages;
