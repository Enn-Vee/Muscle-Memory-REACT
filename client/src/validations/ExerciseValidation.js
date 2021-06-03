import * as yup from 'yup'
import axios from 'axios'

const errors = {
    shortTitle: 'Title must have a minimum of 4 characters',
    longTitle: 'Title must have a maximum of 20 characters.',
    noTitle: 'Please enter the name of the exercise.',
    shortDescription: 'dddddd',
    longDescription: 'Maximum characters allowed is 18 characters.',
    noDescription: 'Please enter a password',
    illegalInput: 'Please don\'t be cheeky.',
    wrongConfirm: 'Passwords must match.',
    noConfirm: 'Please confirm your password.',
}

const muscleGroupList = ['abs', 'back', 'legs', 'shoulders','arms'];

export const exerciseSchema = yup.object().shape({
    title: yup
    .string()
    .min(4, errors.shortTitle)
    .max(20, errors.longTitle)
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
    muscle_group: yup
    .string()
    .oneOf(muscleGroupList, errors.illegalInput)
    .required(),
    description: yup
    .string()
    .min(255, errors.shortDescription)
    .max(2000, errors.longDescription)
    .required(errors.noDescription),
    sets: yup
    .number()
    .moreThan(0, errors.illegalInput)
    .required(),
    reps: yup
    .number()
    .moreThan(0, errors.illegalInput)
    .required(),
    duration: yup
    .number()
    .moreThan(0, errors.illegalInput)
    .required(),
    video_url: yup
    .string()
    .matches(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/i, 'Must be a valid youtube link...') //Regex taken from https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486
    .required() 
})