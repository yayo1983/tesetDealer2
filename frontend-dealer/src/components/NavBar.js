import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Usuario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/package/report">
                Reporte de paquetes
              </Link>
            </li>  
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Rastrear paquete
              </Link>
            </li> 
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Registrar paquete
              </Link>
            </li> 
            <li className="nav-item">
              <Link className="nav-link" to="/#">
                Actualizar paquete
              </Link>
            </li> 
                      
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
