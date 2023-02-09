import React, { useState, useEffect } from "react";

const {ucfirst} = require("../../common/Common");

const First = (props) =>{
    const [user, setUser] = useState([]);
    useEffect(() => {
        setUser(props.getUser());
      }, []);
    
    return (
        <>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"><h1>Seleccione una opción del menú { user ? ucfirst(user[0]) : ''}</h1></div>
                <div className="col-sm-4"></div>
            </div>
        </>);
}

export default First;