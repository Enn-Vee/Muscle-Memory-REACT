import React from 'react'
import { ErrorMessage, useField } from 'formik'
import './Login-Register.css'

function FormField({label, validMessage, ...props}) {
    const [field, meta] = useField(props);
    return (
        <div className="form-floating mb-4">
            <input {...field}{...props} className={`form-control ${meta.touched && !meta.error && 'is-valid'} ${meta.touched && meta.error && 'is-invalid'}`}></input>
            {meta.touched && !meta.error &&
            <div className="valid-feedback valid-message">
                {validMessage}
            </div>}
            <label htmlFor={field.name} className="text-muted">{label}</label>
            <ErrorMessage name={field.name} component="div" className="invalid-feedback error-message"/>
        </div>
    )
}

export default FormField
