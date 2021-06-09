import React from 'react'
import './Exercises.css'
import LikeButton from './LikeButton'

function ExerciseContent({exercise, filters, sortBy}) {

    return (
        <div class="card mb-3 h-100" style={{width:"100%"}}>
            <div class="row g-0">
                <div class="col-sm-12 col-md-12 col-lg-4">
                    <img className="img-fluid" style={{width:"100%"}} src={`https://img.youtube.com/vi/${exercise.video_id}/0.jpg`} alt="exercise" />
                </div>
                <div class="col-sm-12 col-md-12 col-lg-8 content">
                    <div class="card-body content-text">
                        <h3 class="card-title">{exercise.title} / <small class="text-muted">{exercise.target_muscle}</small></h3>
                        <div className="d-flex" style={{marginTop:"-0.55rem"}}>
                            <p className="lead time-details"><em>Sets: {exercise.sets} &nbsp;</em></p>
                            <p className="lead time-details"><em>Reps: {exercise.reps} &nbsp;</em></p>
                            <p className="lead time-details"><em>Duration: {exercise.duration} minutes &nbsp;</em></p>
                        </div>
                        <p class="card-text">{exercise.description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between"> 
                        <p>Submitted by <em>{exercise.author}</em></p>
                        <LikeButton exercise={exercise} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExerciseContent
