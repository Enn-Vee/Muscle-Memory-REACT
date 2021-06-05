const yup = require('yup');
const db = require('../models/database')

/* EXERCISE VALIDATION */

const errors = {
    shortTitle: 'Title must have a minimum of 4 characters',
    longTitle: 'Title must have a maximum of 32 characters.',
    noTitle: 'Please enter the name of the exercise.',
    shortDescription: 'Description too short. Must be a minimum of 64 characters',
    longDescription: 'Maximum characters allowed is 1024 characters.',
    noDescription: 'Please describe the exercise.',
    illegalInput: 'Please don\'t be cheeky.',
}

const muscleGroupList = ['abs', 'back', 'legs', 'shoulders','arms'];

const exerciseSchema = yup.object().shape({
    title: yup
    .string()
    .min(4, errors.shortTitle)
    .max(32, errors.longTitle)
    .test('Duplicate Exercise Title Error', errors.duplicateTitle , async title => {
        /**
         * Helper to get the results from the callback function.
         * @returns Returns a promise which resolves with the results from the query. Throws an error if there was an error during the query.
         */
        const checkDuplicateTitle = () => {
            return new Promise((resolve, reject) => {
                db.query('SELECT exercise_id FROM exercises WHERE title=?', title, (error, result) => {
                    if(error) {
                        reject(err);
                    }
                    resolve(result);
                })
            })
        }

        return await checkDuplicateTitle()
        .then(res => {
            if(res.length > 0) // Title of the exercise is already taken. Thus, input is rejected.
                return false;
            return true;
        })
        .catch(e => {
            console.log('error: ', e);
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
    .min(64, errors.shortDescription)
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
    .required() 
})

const exerciseFilterSchema = yup.object().shape({
    target_muscle: yup.string().oneOf(muscleGroupList, errors.illegalInput),
    min_duration: yup.number().moreThan(0),
    page: yup.number().moreThan(0),
    limit: yup.number().moreThan(0)
})

exports.exerciseSchema = exerciseSchema;
exports.exerciseFilterSchema = exerciseFilterSchema;
