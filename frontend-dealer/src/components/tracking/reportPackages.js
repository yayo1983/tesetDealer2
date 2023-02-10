import React, { useState, useRef } from "react";
import { post } from "../common";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";

const ReportPackages = () => {
  const toast = useRef(null);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(false);
  const [trackings, setTrackings] = useState([]);

  const clearForm = (message) => {
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

  const validateCalendarInput = () => {
    if (date === null || date === "") {
      return false;
    }
    return true;
  };

  const getTrackings = async () => {
    try {
      if (validateCalendarInput()) {
		setError(false);
        let data = {
          date: date,
        };
        let response = await post("package/report", data);
        response = JSON.stringify(response);
        if (response.status !== 200) {
          showToast("error", "Error", "Error en la petición");
        } else {
          clearForm("Se ha realizado la petición exitosamente");
          setDate(null);
        }
      }else{
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
          <h2>Reporte de paquetes </h2>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-6	">
          <Panel header="Importar ">
            Fecha para reportar:
            <br />
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              placeholder="dd/mm/yyyy"
              tooltip="Seleccione una fecha para generar el reporte"
              readOnlyInput
              className={classError}
              required
            />
            {error && <Message severity="error" text="Seleccione una fecha" />}
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
        <div className="col-sm-8">
          <DataTable value={trackings} responsiveLayout="scroll">
            <Column field="package_id" header="ID del paquete"></Column>
            <Column field="status" header="Estado del paquete"></Column>
            <Column field="date" header="Fecha de rastreo"></Column>
            <Column field="address" header="Ubicación"></Column>
            <Column field="type" header="Tipo de ubicación"></Column>
          </DataTable>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};

export default ReportPackages;
