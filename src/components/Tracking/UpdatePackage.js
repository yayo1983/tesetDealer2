import React, { useState, useRef } from "react";
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
const {patch} = require("../../common/Common");

const UpdatePackage = () =>{
    const [idPackage, setIdPackage] = useState('');
    const [errorIdPackage, setErrorIdPackage] = useState(false);
    const [address, setAddress] = useState('');
    const [errorAddress, setErrorAddress] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [errorSelectedStatus, setErrorSelectedStatus] = useState(false);
    const statuses = [
        { name: 'Aceptado', code: 'A' },
        { name: 'Iniciado', code: 'I' },
        { name: 'En tránsito', code: 'T' },
        { name: 'Entregado', code: 'E' },
    ];

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail, life: 3000});
    };

    const cleanFormUpdate = (message) =>{ 
        toogleError(false);
        setIdPackage('');
        setAddress('');
        setSelectedStatus('');
        showToast('success', 'Success', message );
    };

    const toogleError = (value) =>{
        setErrorIdPackage(value);
        setErrorAddress(value);
        setErrorSelectedStatus(value);
    } 

    const updateTracking = async () => {
        try{
            const parameters = {
                idPackage: idPackage,
                address: address,
                status: selectedStatus
            }
            let { data } = await patch('package/update', parameters);
            cleanFormUpdate('Actualizado el paquete con identificador '+ idPackage);            
        }catch(error){
            showToast('error', 'Error', 'Error en la actualización del paquete con el identificador '+ idPackage);
            toogleError(true);
        }
      };
      let classErrorIdPackage = errorIdPackage? "p-invalid mr-2": '';
      let classErrorAddress = errorAddress? "p-invalid mr-2": '';
      let classErrorStatus= errorSelectedStatus? "w-full md:w-14rem p-invalid mr-2": 'w-full md:w-14rem';

    return (
        <>
            <Toast ref={toast} />
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                    <Panel header="Formulario para actualizar paquete">
                        
                            <label htmlFor="id_id">Identificador:</label><br/>
                            <InputText 
                                value={idPackage} 
                                onChange={(e) => setIdPackage(e.target.value)} 
                                name= "id" 
                                placeholder="Identificador" 
                                tooltip="Escriba el Identificador del paquete" 
                                maxLength="250" 
                                minLength="4" 
                                required
                                className={classErrorIdPackage} />
                                {errorIdPackage && (<Message severity="error" text="El identificador es requerida" />)}
                        
                        <br/> <br/>
                        
                            <label htmlFor="address">Ubicación del paquete:</label><br/>
                            <InputText 
                                value={idPackage} 
                                onChange={(e) => setIdPackage(e.target.value)} 
                                name= "address" 
                                placeholder="Ubicación" 
                                tooltip="Escriba el nombre de la ciudad donde se encuentra el paquete" 
                                maxLength="250" 
                                minLength="4" 
                                required 
                                className={classErrorAddress}/>
                                {errorAddress && (<Message severity="error" text="La ubicación del paquete es requerida" />)}
                       
                       <br/> <br/>
                            <label htmlFor="id_status">Estado:</label><br/>
                            <Dropdown 
                                value={selectedStatus} 
                                onChange={(e) => setSelectedStatus(e.value)} 
                                options={statuses} optionLabel="name" 
                                placeholder="Seleccione un estado" 
                                className={classErrorStatus} /> 
                                {errorSelectedStatus && (<Message severity="error" text="El estado es requerida" />)}
                        <br/> <br/> 
                        <div className="justify-content-left ">
                            <Button icon="pi pi-check"  label="Actualizar" onClick={updateTracking}/>
                        </div>
                    </Panel>
                    </div>
                        <div className="col-sm-4"></div>
                </div>
        </>);
}

export default UpdatePackage;