import React from 'react'
import { ErrorMessage, useField } from 'formik'
import './Login-Register.css'

function FormField({label, ...props}) {
    const [field, meta] = useField(props);
    return (
        <div className="form-group mb-4">
            <div>
                
            </div>
            <label htmlFor={field.name} className="mb-1">{label}</label>
            <input {...field}{...props} className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}></input>
            <ErrorMessage name={field.name} component="div" className="invalid-feedback error-message"/>
        </div>
        
    )
}

export default FormField
