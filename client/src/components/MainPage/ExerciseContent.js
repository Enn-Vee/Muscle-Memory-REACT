import React from 'react'
import './Exercises.css'
import LikeButton from './LikeButton'

const colorBadges = (difficulty) => {
    if(difficulty.includes('Easy'))
        return "bg-success"
    else if(difficulty.includes('Medium'))
        return "bg-warning"
    else if(difficulty.includes('Hard'))
        return "bg-danger"
    else 
        return ""
}


function ExerciseContent({exercise, filters, sortBy}) {

    return (
        <div className="card mb-3 h-100" style={{width:"100%"}}>
            <div className="row g-0">
                
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <img className="img-fluid" style={{width:"100%"}} src={`https://img.youtube.com/vi/${exercise.video_id}/0.jpg`} alt="exercise" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-8 content">
                    <div className="card-body content-text">
                        <h3 className="card-title">{exercise.title}  / <small className="text-muted">{exercise.target_muscle}</small></h3>
                        
                        <div className="d-flex">
                            <p className={`badge me-1 ${colorBadges(exercise.difficulty)}`}>{exercise.difficulty}</p>
                            <p className="lead time-details"><em>Sets: {exercise.sets} &nbsp;</em></p>
                            <p className="lead time-details"><em>Reps: {exercise.reps} &nbsp;</em></p>
                            <p className="lead time-details"><em>Duration: {exercise.duration} minutes &nbsp;</em></p>
                        </div>
                        <p className="card-text">{exercise.description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between"> 
                        <p>Submitted by <em>{exercise.author}</em> on <em>{new Date(exercise.created_at).toDateString().split(' ').slice(1).join(' ')}</em></p>
                        <LikeButton exercise={exercise} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExerciseContent
