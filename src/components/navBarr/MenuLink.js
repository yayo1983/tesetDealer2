import React, { useState, useEffect } from "react";
const {ucfirst} = require("../../common/Common");

const Menu = (props) =>{
  const [user, setUser] = useState([]);

    useEffect(() => {
      setUser(props.getUser());
    }, []);

   return (
    <>
      <div className="row">
         <div className="col-sm-4"></div>
         <div className="col-sm-4"><h1>Menú</h1></div>
         <div className="col-sm-4"></div>
      </div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
            <nav>
                <ul id='menu'>
                  <li><a href='/'>Usuario: { user ? ucfirst(user[0]) : ''}</a></li>
                  { user && (<li><a href="/#">Salir de sesion</a></li>)} 
                  { !user && ( <li><a href="/#">Autenticar</a></li>)}
                  { user && (<li><a href="/#">Rastrear paquete</a></li>)} 
                  { user && (<li><a href="/#">Reporte de paquetes por día</a></li>)} 
                  { user && (<li><a href="/#">Registrar paquete</a></li>)} 
                  { user && (<li><a href="/#">Actualizar paquete</a></li>)} 
                </ul>
	          </nav>
        </div>
		    <div className="col-sm-4"></div>
	    </div>
    </>
   );
}

export default Menu;