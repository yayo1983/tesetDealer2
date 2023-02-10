import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ReportPackages from './components/tracking/reportPackages';
import "bootstrap/dist/css/bootstrap.min.css"
import Initial from './components/tracking/initial';
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
            </Routes>
          </div>
        </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
