import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import FormField from './FormField'
import axios from 'axios'
import  {exerciseSchema} from '../../validations/ExerciseValidation.js' 
import './Login-Register.css'

function ExerciseSubmission() {

    const submitExercise = async (formValues, actions) => {
        await axios.post("http://localhost:3001/exercises", formValues, {
            withCredentials: true
        })
        .then(res => {
            actions.resetForm();
            window.location.reload();
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
    <div className="accordion" id="submitAccordion">
        <div className="accordion-item">
            <h2 className="accordion-header" id="submitExercise">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#exerciseForm" aria-expanded="true" aria-controls="exerciseForm">
                Submit Exercise
            </button>
            </h2>
            <div id="exerciseForm" className="accordion-collapse collapse" aria-labelledby="submitExercise" data-bs-parent="#submitAccordion">
                <div className="accordion-body">
                    <Formik initialValues={{
                        title: '',
                        target_muscle: 'abs',  
                        difficulty: 'easy',   
                        description: '',
                        sets: 3,
                        reps: 8,
                        duration: 10,
                        video_url: ''
                    }}
                    validationSchema={exerciseSchema}
                    validateOnChange={false}
                    validateOnBlur={true}
                    onSubmit={(formValues, actions) => {
                        submitExercise(formValues, actions);
                        
                    }}
                    enableReinitialize={true}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div>
                                    <FormField label="Exercise Title" name="title" type="text" placeholder="Enter the name of the exercise..." />
                                    <div className="form-floating mb-4">
                                        
                                        <Field name="target_muscle" as="select" className="form-control" style={{height: "60px"}}>
                                            <option value='abs'>Abs</option>
                                            <option value='back'>Back</option>
                                            <option value='legs'>Legs</option>
                                            <option value='shoulders'>Shoulders</option>
                                            <option value='arms'>Arms</option>
                                        </Field>
                                        <label htmlFor="target_muscle">Muscle Group</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <Field name="difficulty" as="select" className="form-control" style={{height:"60px"}}>
                                            <option value='very easy'>Very Easy</option>
                                            <option value='easy'>Easy</option>
                                            <option value='medium'>Medium</option>
                                            <option value='hard'>Hard</option>
                                            <option value='very hard'>Very Hard</option>
                                        </Field>
                                        <label htmlFor="target_muscle">Difficulty</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <Field as="textarea" name="description" className={`form-control ${errors.description && touched.description && 'is-invalid'}`} placeholder="Describe the exercise..." style={{height:"125px"}}></Field>
                                        <label htmlFor="description" className="mb-1 text-muted">Description</label>
                                        <ErrorMessage name="description" component="div" className="invalid-feedback error-message"/>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <FormField label="Sets" name="sets" type="number" min="1"/>
                                        </div>
                                        <div className="col">
                                            <FormField label="Repetitions" name="reps" type="number" min="1"/>
                                        </div>
                                    </div>
                                    
                                    <FormField label="Duration (in minutes)" name="duration" type="number" min="1"/>
                                    <FormField label="Video URL (Youtube Only)" name="video_url" type="text" placeholder="Enter a youtube link demonstrating the exercise..."/>
                                </div>
                                <div className="text-center mb-2">
                                    <button type="submit" className="btn btn-primary">Submit Exercise</button>
                                </div>
                                
                            </Form>
                        )}
                    </Formik>                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default ExerciseSubmission
