import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext';

function LikeButton({exercise}) {

    const [liked, setLiked] = useState(false);
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
        checkIfLiked();
    }, [liked])


    const likeExercise = async (e) => {
        e.preventDefault();
        if(!liked)
            return await axios.post(`http://localhost:3001/exercises/${exercise.exercise_id}/like`, {}, {withCredentials: true})
            .then(res => {
                setLiked(res.data)
            })
            .catch(error => {
                console.log(error);
            })
        else
            return await axios.delete(`http://localhost:3001/exercises/${exercise.exercise_id}/unlike`, {withCredentials: true})
                .then(res => {
                    setLiked(res.data)
                })
                .catch(error => {
                    console.log(error);
                })  
    }

    return (
        <div>
            <button type="button" className="like-button" onClick={e => {likeExercise(e)}}><i className={`fas fa-heart ${liked && 'is-liked'}`}></i></button>
        </div>
    )
}

export default LikeButton
