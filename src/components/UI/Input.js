import React from 'react';

const Input = (props) =>{
    return (
    <p>
        <label htmlFor={props.name}>{props.label}:</label>
        <input type="text" name={props.name} className="form-control" placeholder={props.label}
               maxLength={props.maxLength} minLength={props.minLength} required 
               id={props.name} onChange={props.onChange}  value={props.value}/>
    </p>);

};

export default Input
