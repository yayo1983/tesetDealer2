import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/NavBar';
import reportWebVitals from './reportWebVitals';
import Initial from './components/tracking/initial';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdatePackage from './components/tracking/updatePackage';
import ReportPackages from './components/tracking/reportPackages';
import RegisterPackage from './components/tracking/registerPackage';
import TrackingPackages from './components/tracking/trackingPackages';
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";            

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter>
          <NavBar />
          <div className='container-fluid my-4'>
            <Routes>
              <Route exact path='/' element={<Initial />}/> 
              <Route exact path='/package/report' element={<ReportPackages />}/>
              <Route exact path='/tracking/packages' element={<TrackingPackages />}/> 
              <Route exact path='/package/create' element={<RegisterPackage />}/> 
              <Route exact path='/package/update' element={<UpdatePackage />}/> 
            </Routes>
          </div>
        </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
