import React from 'react';

const InputNumber = (props) =>{
    return (
    <p>
        <label htmlFor={props.name}>{props.label}:</label>
        <input type="number" name={props.name} className="form-control"
               max={props.maxLength} min={props.minLength} required placeholder={props.label}
               id={props.name} onChange={props.onChange}  value={props.value} step={props.step} />
    </p>);

};

export default InputNumber
