import React from 'react'
import { ErrorMessage, useField } from 'formik'
import './Login-Register.css'

function FormField({label, validMessage, ...props}) {
    const [field, meta] = useField(props);
    return (
        <div className="form-group mb-4">
            <label htmlFor={field.name} className="mb-1">{label}</label>
            <input {...field}{...props} className={`form-control ${meta.touched && !meta.error && 'is-valid'} ${meta.touched && meta.error && 'is-invalid'}`}></input>
            {meta.touched && !meta.error &&
            <div className="valid-feedback valid-message">
                {validMessage}
            </div>}
            <ErrorMessage name={field.name} component="div" className="invalid-feedback error-message"/>
        </div>
    )
}

export default FormField
