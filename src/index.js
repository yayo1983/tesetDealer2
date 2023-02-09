import React, {useRef} from "react";
import ReactDOM from 'react-dom/client';
import ReportPackageList from './components/Tracking/ReportPackageList';
import TrackingPackageList from './components/Tracking/TrackingPackageList';
import RegisterPackage from './components/Tracking/RegisterPackage';
import UpdatePackage from './components/Tracking/UpdatePackage';
import First from './components/Tracking/First';
import NavBarr from "./components/navBarr/NavBarr";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"  
import './index.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css"; 

const {get} = require("./common/Common");


const root = ReactDOM.createRoot(document.getElementById('root'));

const getUser = async () => {
  try{
      const { data } = await get('user');
      return data;
  }catch(error){
      console.log(error.message);
  }
}

root.render(
  <BrowserRouter>
    <NavBarr getUser={getUser}  />
    <div className="container-fluid my-4">
      <Routes>  
            <Route exact path="/" element={<First getUser={getUser}/>} />
            <Route exact path="/package/create" element={<RegisterPackage  />} />
            <Route exact path="/trackings" element={<TrackingPackageList  />} />
            <Route exact path="/package/update" element={<UpdatePackage  />} />
            <Route exact path="/package/report" element={<ReportPackageList />} />
      </Routes>

    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
