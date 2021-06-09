import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext';

function LikeButton({exercise}) {

    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(exercise.likes);
    const {user} = useContext(UserContext);

    useEffect(() => {
        const checkIfLiked = async () => {
            await axios.get(`http://localhost:3001/users/${user.username}/liked/${exercise.exercise_id}`)
            .then(res => {
                setLiked(res.data)
            })
            .catch(error => {
                console.log(error);
            })
        }
        if(user)
            checkIfLiked();
    }, [liked])

    const getNumLikes = async () => {
        await axios.get(`http://localhost:3001/exercises/${exercise.exercise_id}/likes`, {withCredentials:true})
        .then(res => {
            setNumLikes(res.data[0].likes);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const likeExercise = async (e) => {
        e.preventDefault();
        if(!liked) {
            await axios.post(`http://localhost:3001/exercises/${exercise.exercise_id}/like`,{}, {withCredentials: true})
            .then(res => {
                setLiked(res.data)
            })
            .catch(error => {
                console.log(error);
            })
        }
        else {
            await axios.delete(`http://localhost:3001/exercises/${exercise.exercise_id}/unlike`, {withCredentials: true}) 
            .then(res => {
                setLiked(res.data)
            })
            .catch(error => {
                console.log(error);
            })  
        }
        getNumLikes()
    }

    return (
        <div className=" d-flex align-items-center">
            {user ? 
            <>
                <button 
                type="button" 
                className="like-button m-1" 
                onClick={e => {likeExercise(e)}} 
                title="Like this exercise."
                >
                    <i className={`fas fa-heart ${liked && 'is-liked'}`}></i>
                </button>
            </> :
                <div className="like-button m-1">
                    <i className={`fas fa-heart is-liked`}></i>
                </div>}
                <span>{numLikes}</span> 
        </div>
    )
}

export default LikeButton
