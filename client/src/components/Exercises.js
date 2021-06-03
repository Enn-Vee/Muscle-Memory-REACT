import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../contexts/UserContext'
import ExerciseSubmissionModal from './ExerciseSubmissionModal'
import axios from 'axios'
import './Exercises.css'
import LikeButton from './LikeButton'
//import FilterSortBar from './FilterSortBar'

function Exercises() {
    const {user} = useContext(UserContext);
    const [exercises, setExercises] = useState(null);

    useEffect(() => {
        const getExercises = async () => {
            await axios.get('http://localhost:3001/exercises')
            .then(res => {
                setExercises(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
        document.title = "Muscle Memory | Exercises" 
        getExercises();
    }, [])
    
    return (
        <div>
            <div>
                {/* FILTER, SORT, AND SUBMISSION*/ user ? <ExerciseSubmissionModal /> : null}
            </div>
            <ul className="d-flex flex-wrap">
                    {exercises ? exercises.map(exercise => {
                        return (
                            <li className="card col-sm-6 col-md-4 col-lg-3 my-3" key={exercise.exercise_id}>
                                <img className="card-img-top" src={`https://img.youtube.com/vi/${exercise.video_id}/0.jpg`}></img>
                                <div className="px-5">
                                    <h1 className="text-center">{exercise.title}</h1>
                                </div>
                                <div className="card-footer bg-transparent d-flex justify-content-between align-items-center">
                                    <div>
                                        <p>{exercise.author}</p>
                                    </div>
                                    {user ? <LikeButton exercise={exercise}/> : null}
                                </div>
                            </li>
                        );
                    }) : null}
            </ul>
        </div>
    )
}

export default Exercises
