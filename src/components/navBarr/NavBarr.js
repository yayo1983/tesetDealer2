import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const {ucfirst} = require("../../common/Common");

const NavBarr = (props) => {

    const [user, setUser] = useState([]);

    useEffect(() => {
      setUser(props.getUser());
    }, []);

   return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Usuario: { user ? ucfirst(user[0]) : ''}</Link>
            </li>
            <li className="nav-item">
                { user && (<Link className="nav-link" to="/">Salir de sesion</Link>)} 
                { !user && (<Link className="nav-link" to="/">Autenticar</Link>)}
            </li>
            { user && (
              <li className="nav-item">
                    <Link className="nav-link" to="/trackings">Rastrear paquete</Link>
              </li>
            )}
            { user && (
              <li className="nav-item">
                    <Link className="nav-link" to="/package/report">Reporte de paquetes por día</Link>
              </li>
            )}
            { user && (
              <li className="nav-item">
                   <Link className="nav-link" to="/package/create">Registrar paquete</Link>
              </li>
            )}
            { user && (
              <li className="nav-item">
                    <Link className="nav-link" to="/package/update">Actualizar paquete</Link>
              </li>
            )}
            </ul>
        </div>
    </nav>
</>
};

export default NavBarr;

