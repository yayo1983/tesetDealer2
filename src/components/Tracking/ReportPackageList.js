import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';   
import { Toast } from 'primereact/toast';
const {post} = require("../../common/Common");

const ReportPackageList = () =>{
    const [packages, setPackages] = useState([]);
    const [date_report, setDateReport] = useState([]);
    const [error, setError] = useState(false);

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail, life: 3000});
    }

    const cleanForm = (data, message) =>{
        setError(false)
        setDateReport('')
        setPackages(data); 
        showToast('success', 'Success', message)
    }

    const getPackages = async () => {
        try{
            const parameter = {products: packages}
            let { data } = await post('package/report', parameter);
            cleanForm(data, 'Busqueda para la fecha '+ date_report  + ' especificada');
        }catch(error){
            setError(true)
            showToast('error', 'Error', 'Error en la búsqueda de rastreo del paquete con la fecha especificada');
        }
      };

      let classError= error? "p-invalid mr-2": '';
    
    return (
        <>
            <Toast ref={toast} />
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"><h1>Reporte de paquetes </h1></div>
                <div className="col-sm-4"></div>
            </div>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                <Panel header="Formulario de busqueda por fecha">
                    <div className="flex flex-wrap align-items-center mb-3 gap-2">   
                        <label>Seleccione fecha para reportar:</label><br/> 
                        <Calendar value={date_report} 
                                  onChange={(e) => setDateReport(e.value)} 
                                  dateFormat="dd/mm/yy" 
                                  tooltip="Seleccione la fecha del reporte deseado" 
                                  placeholder='dd/mm/yy'
                                  readOnlyInput 
                                  className={classError}  />
                         {error && (<Message severity="error" text="La fecha es requerida" />)}
                    </div>
                        <p></p>
                        <div className="justify-content-left ">
                            <Button icon="pi pi-check"  label="Reportar" onClick={getPackages}/>
                        </div>
                </Panel>
                </div>
                <div className="col-sm-4"></div>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"> <h3>Datos de rastreo para la fecha</h3></div>
                <div className="col-sm-4"></div>
            </div>
            <br/>       
            <div className="row">
                <div className="col-md-4"></div>
                
                <div className="col-md-6">
                    <p><a href="/export_excel/2023-02-07">Exportar a Microsoft Excel</a></p>
                    <DataTable value={packages} responsiveLayout="scroll">
                        <Column field="paquete_id" header="ID del paquete"></Column>
                        <Column field="date" header="Fecha de rastreo"></Column>
                        <Column field="address" header="Ubicación"></Column>
                        <Column field="quantity" header="Tipo de Ubicación"></Column>
                    </DataTable>
                </div>
                <div className="col-md-4"></div>
                
            </div>
        </>);
}

export default ReportPackageList;