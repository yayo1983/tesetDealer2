import React, { useState, useRef } from "react";
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
const {post} = require("../../common/Common");

const TrackingPackageList = () =>{
    const [idPackage, setIdPackage] = useState('');
    const [trackings, setTrackings] = useState([]);
    const [error, setError] = useState(false);

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail, life: 3000});
    };

    const cleanForm = (data, message) =>{
        setError(false)
        setIdPackage('')
        setTrackings(data); 
        showToast('success', 'Success', message)
    };

    const getTrackings = async () => {
        try{
            const parameter = {idPackage: idPackage}
            let { data } = await post('trackings', parameter);
            cleanForm(data, 'Busqueda para el identificador '+ idPackage + ' realizada');
        }catch(error){
            showToast('error', 'Error', 'Error en la búsqueda de rastreo del paquete con el identificador especificado');
            setError(true);
        }
      };

      let classError= error? "p-invalid mr-2": '';

    return (
        <>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"><h1>Estado del rastreo </h1></div>
                <div className="col-sm-4"></div>
            </div>
            <Toast ref={toast} />

            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                    <Panel header="Formulario de búsqueda por indentificador">
                            <label>Identificador:</label><br/> 
                            <InputText 
                                value={idPackage} 
                                onChange={(e) => setIdPackage(e.target.value)} 
                                name= "id_package" 
                                placeholder="Identificador" 
                                tooltip="Escriba el identificador del paquete"
                                className={classError} />
                               {error && (<Message severity="error" text="El indentificdor es requerido" />)}
                               <p>  </p>
                            <div className="justify-content-left ">
                                <Button icon="pi pi-check"  label="Buscar" onClick={getTrackings}/>
                            </div>
                    </Panel>
                </div>
                <div className="col-sm-4"></div>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"><h3>Datos de rastreo para la fecha</h3></div>
                <div className="col-sm-4"></div>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-6"> 
                <DataTable value={trackings} responsiveLayout="scroll">
                        <Column field="paquete_id" header="ID del paquete"></Column>
                        <Column field="date" header="Fecha de rastreo"></Column>
                        <Column field="address" header="Ubicación"></Column>
                        <Column field="quantity" header="Tipo de Ubicación"></Column>
                    </DataTable>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </>);
}

export default TrackingPackageList;