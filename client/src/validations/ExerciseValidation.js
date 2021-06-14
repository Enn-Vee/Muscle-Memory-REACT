import * as yup from 'yup'
import axios from 'axios'

const errors = {
    shortTitle: 'Title must have a minimum of 4 characters',
    longTitle: 'Title must have a maximum of 32 characters.',
    noTitle: 'Please enter the name of the exercise.',
    shortDescription: 'Description too short. Must be a minimum of 12 characters',
    longDescription: 'Maximum characters allowed is 1024 characters.',
    noDescription: 'Please describe the exercise.',
    illegalInput: 'Please don\'t be cheeky.',
    noUrl: 'Please enter a link to a youtube video.'
}


const muscleGroupList = ['abs', 'back', 'legs', 'shoulders','arms'];
const validDifficulty = ['very easy', 'easy', 'medium', 'hard', 'very hard']

export const exerciseSchema = yup.object().shape({
    title: yup
    .string()
    .min(4, errors.shortTitle)
    .max(32, errors.longTitle)
    .test('exerciseDuplicateCheck', 'Title already taken.', async title => {
        return await axios.get(`http://localhost:3001/exercises/${title}`, { title: title })
        .then(res => {
            if(res.data.length > 0)
                return false
            return true;
        })
        .catch(err => {
            console.log(err);
        })
    })
    .required(errors.noTitle),
    target_muscle: yup
    .string()
    .oneOf(muscleGroupList, errors.illegalInput)
    .required(),
    //Description must have a minimum of 64 characters and a maximum of 1028.
    description: yup
    .string()
    .min(12, errors.shortDescription)
    .max(1028, errors.longDescription)
    .required(errors.noDescription),
    //Number of sets cannot be lesser than 1.
    sets: yup
    .number()
    .moreThan(0, errors.illegalInput)
    .required(),
    //Number of reps cannot be lesser than 1.
    reps: yup
    .number()
    .moreThan(0, errors.illegalInput)
    .required(),
    //Duration cannot be lesser than 1. Duration is in minutes.
    duration: yup
    .number()
    .moreThan(0, errors.illegalInput)
    .required(),
    //URL must be a valid youtube link.
    video_url: yup
    .string()
    .matches(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/i, 'Must be a valid youtube link...') //Regex taken from https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486
    .required(errors.noUrl),
    //Difficulty must be in one of the given difficulty categories.
    difficulty: yup
    .string()
    .oneOf(validDifficulty, errors.illegalInput)
    .required()
})