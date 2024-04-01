import React from "react";
import "./LabelInput.styles.css";
const LabelInput = ({
    type,
    name,
    id,
    placeholder,
    label,
    value,
    onChangeHandler,
}) => {
    return (
        <div className="label-input">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                id={id}
                placeholder={placeholder}
                className="input-field"
                onChange={onChangeHandler}
            />
        </div>
    );
};

export default LabelInput;
