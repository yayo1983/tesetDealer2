import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Panel } from "primereact/panel";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ReportPackages = () => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState(true);
  const [trackings, setTrackings] = useState([]);

  let classError = error ? "p-invalid mr-2" : "";

  return (
    <>
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
            />
            <Message severity="error" text="Seleccione una fecha" />
            <div className="flex flex-wrap align-items-center justify-content-left">
              <br />
              <Button label="Buscar" icon="pi pi-check" />
            </div>
          </Panel>
          <div className="col-sm-4"></div>
        </div>
      </div>
	  <br/>
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
