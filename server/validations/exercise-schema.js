const yup = require('yup');
const db = require('../models/database')

/* EXERCISE VALIDATION */

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

const exerciseSchema = yup.object().shape({
    title: yup
    .string()
    .min(4, errors.shortTitle)
    .max(32, errors.longTitle)
    .test('Duplicate Exercise Title Error', errors.duplicateTitle , async title => {
        const checkDuplicateTitle = () => {
            return new Promise((resolve, reject) => {
                db.query('SELECT id FROM exercise WHERE title=?', title, (error, result) => {
                    if(error)
                        reject(err);
                    resolve(result);
                })
            })
        }

        return await checkDuplicateTitle()
        .then(res => {
            if(res.length > 0)
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
    description: yup
    .string()
    .min(100, errors.shortDescription)
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

module.exports = exerciseSchema;
