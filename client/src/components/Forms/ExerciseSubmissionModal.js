import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import FormField from './FormField'
import axios from 'axios'
import  {exerciseSchema} from '../../validations/ExerciseValidation.js' 
import './Login-Register.css'


function SubmissionModal() {

    const submitExercise = async (formValues) => {
        await axios.post("http://localhost:3001/exercises", formValues, {
            withCredentials: true
        })
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Submit New Exercise
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Exercise Submission</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <Formik initialValues={{
                            title: '',
                            target_muscle: 'abs',     
                            description: '',
                            sets: 3,
                            reps: 8,
                            duration: 10,
                            video_url: ''
                        }}
                        validationSchema={exerciseSchema}
                        validateOnChange={false}
                        validateOnBlur={true}
                        onSubmit={formValues => {
                            submitExercise(formValues);
                        }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="modal-body">
                                        <FormField label="Exercise Title" name="title" type="text" placeholder="Enter the name of the exercise..." />
                                        <div className="form-group">
                                            <label htmlFor="target_muscle">Muscle Group</label>
                                            <Field name="target_muscle" as="select" className="form-control">
                                                <option value='abs'>Abs</option>
                                                <option value='back'>Back</option>
                                                <option value='legs'>Legs</option>
                                                <option value='shoulders'>Shoulders</option>
                                                <option value='arms'>Arms</option>
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description: </label>
                                            <Field as="textarea" name="description" className={`form-control ${errors.description && touched.description && 'is-invalid'}`} placeholder="Describe the exercise..." rows="3"></Field>
                                            <ErrorMessage name="description" className="invalid-feedback error-message"/>
                                        </div>
                                        <FormField label="Sets" name="sets" type="number" min="1"/>
                                        <FormField label="Repetitions" name="reps" type="number" min="1"/>
                                        <FormField label="Duration (in minutes)" name="duration" type="number" min="1"/>
                                        <FormField label="Video URL (Youtube Only) :" name="video_url" type="text" placeholder="Enter a youtube link demonstrating the exercise..."/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
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

export default SubmissionModal
