import React, { useState, useRef } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { Panel } from 'primereact/panel';   
import { Toast } from 'primereact/toast';
import { post } from "../../common/Common";
import InputNumber from "../UI/InputNumber";
import { Message } from 'primereact/message';

const RegisterPackage = () =>{
    const [description, setDescription] = useState('');
    const [errorDescription, setErrorDescription] = useState(false);
    const [size, setSize] = useState(0);
    const [errorSize, setErrorSize] = useState(false);
    const [address_origin, setAddressOrigin] = useState('');
    const [errorAddressOrigin, setErrorAddressOrigin] = useState(false);
    const [address_destination, setAddressDestination] = useState('');
    const [errorAddressDestination, setErrorAddressDestination] = useState('');
    const [email_receiver, setEmailReceiver] = useState('');
    const [errorEmailReceiver, setErrorEmailReceiver] = useState('');

    const cleanFormRegister = () =>{ 
        setDescription('');
        setSize('');
        setAddressOrigin('');
        setAddressDestination('');
        setEmailReceiver('');
        toogleError(false);
        
    };

    const toogleError  = (value) =>{
        setErrorDescription(value);
        setErrorSize(value);
        setErrorAddressOrigin(value);
        setErrorAddressDestination(value);
        setErrorEmailReceiver(value);
    }

    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail, life: 3000});
    }
        
    const handleSubmit = async (e) =>{ 
        try{
            e.preventDefault();
            const object = {
            'description': description.trim(),
            'size':size,
            'address_origin':address_origin.trim(),
            'address_destination':address_destination.trim(),
            'email_receiver':email_receiver.trim()
            }
            let result = await post('package/create', object);
            const data = await result.json();
            if(data.message == 'Success'){
                cleanFormRegister();
                showToast('success', 'Success', 'Registrado nuevo paquete');
            }
            console.log(data); 
            showToast('error', 'Error', 'Error en el registro del nuevo paquete');
            toogleError(true);
        }
        catch(error){
            console.log(error);
            showToast('error', 'Error', 'Error en el registro del nuevo paquete');
        }
    };

    let classErrorDescription= errorDescription? "p-invalid mr-2": '';
    let classErrorSize = errorSize? "p-invalid mr-2": '';
    let classErrorAddressOrigin = errorAddressOrigin? "p-invalid mr-2": '';
    let classErrorAddressDestination = errorAddressDestination ? "p-invalid mr-2": '';
    let classErrorEmailReceiver= errorEmailReceiver? "w-full md:w-14rem p-invalid mr-2": 'w-full md:w-14rem';
    
    return (
        <>
            <Toast ref={toast} />
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"><h1>Registrar paquete</h1></div>
                <div className="col-sm-4"></div>
            </div>
            
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                <Panel header="Formulario de busqueda por ID de paquete">
                    <form onSubmit={handleSubmit}>
                        <Input 
                                name="description"
                                maxLength="250" 
                                minLength="4" 
                                onChange={(e) => setDescription(e.value)} 
                                value={description}
                                label="Descripción"
                                className={classErrorDescription} />
                        {errorDescription && (<Message severity="error" text="La descripción es requerida" />)}
                            
                        <InputNumber
                            name="size"  
                            min="0" max="100000" 
                            step="any" 
                            onChange={(e) => setSize(e.value)} 
                            value={size}
                            label="Tamaño" 
                            className={classErrorSize} />
                        {errorSize && (<Message severity="error" text="El tamaño es requerido" />)}
                        
                        <Input 
                                name="address_origin" 
                                maxLength="250" 
                                minLength="4"  
                                onChange={(e) => setAddressOrigin(e.value)} 
                                value={address_origin}
                                label="Dirección origen"
                                className={classErrorAddressOrigin} />
                        {errorAddressOrigin && (<Message severity="error" text="La dirección de origen es requerida" />)}

                        <Input 
                                name="address_destination" 
                                maxLength="250" 
                                minLength="4" 
                                onChange={(e) => setAddressDestination(e.value)} 
                                value={address_destination}
                                label="Dirección destino"
                                className={classErrorAddressDestination} />
                        {errorAddressDestination && (<Message severity="error" text="La dirección de destino es requerida" />)}
                            
                        <Input 
                                name="email_receiver" 
                                maxLength="250" 
                                minLength="4"
                                onChange={(e) => setEmailReceiver(e.value)}
                                value={email_receiver}
                                label="Correo"
                                className={classErrorEmailReceiver} />
                        {errorEmailReceiver && (<Message severity="error" text="El correo es requerido" />)}

                        <Button text="Registrar" />
                        </form>
                </Panel>
                    
                </div>
			    <div className="col-sm-4"></div>
		    </div>
           
        </>);
}

export default RegisterPackage;