const yup = require('yup');
const db = require('../models/database')

/* REGISTRATION VALIDATION */

const registrationErrors = {
    invalidEmail: 'Must enter a valid e-mail address.',
    noEmail: 'Please enter your e-mail address.',
    duplicateEmail: 'E-mail is already taken.',
    shortUsername: 'Username must have a minimum of 6 characters.',
    longUsername: 'Username has a maximum of 12 characters.',
    noUsername: 'Please enter a username.',
    duplicateUsername: 'Username is already taken.',
    shortPassword: 'Password must have a minimum of 6 characters.',
    longPassword: 'Maximum characters allowed is 18 characters.',
    noPassword: 'Please enter a password',
    wrongConfirm: 'Passwords must match.',
    noConfirm: 'Please confirm your password.'
}

const registrationSchema = yup.object().shape({
    email: yup
    .string()
    .email(registrationErrors.invalidEmail)
    .test('Duplicate E-Mail Error', registrationErrors.duplicateEmail , async email => {
        const checkDuplicateEmail = () => {
            return new Promise((resolve, reject) => {
                db.query('SELECT id FROM users WHERE email=?', email, (error, result) => {
                    if(error)
                        reject(err);
                    resolve(result);
                })
            })
        }

        return await checkDuplicateEmail()
        .then(res => {
            if(res.length > 0)
                return false;
            return true;
        })
        .catch(e => {
            console.log('error: ', e);
        })
    })
    .required(registrationErrors.noEmail),
    username: yup
    .string()
    .min(6, registrationErrors.shortUsername)
    .max(12, registrationErrors.longUsername)
    .test('Duplicate Username Error', registrationErrors.duplicateUsername, async (username)  => {

        const checkDuplicateUsername = () => {
            return new Promise((resolve, reject) => {
                db.query('SELECT id FROM users WHERE username=?', username, (error, result) => {
                    if(error)
                        reject(err);
                    resolve(result);
                })
            })
        }

        return await checkDuplicateUsername()
        .then(res => {
            if(res.length > 0)
                return false;
            return true;
        })
        .catch(e => {
            console.log('error: ', e);
        })
    })
    .required(registrationErrors.noUsername),
    password: yup
    .string()
    .min(6, registrationErrors.shortPassword)
    .max(18, registrationErrors.longPassword)
    .required(registrationErrors.noPassword),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], registrationErrors.wrongConfirm)
    .required(registrationErrors.noConfirm)
})
module.exports = registrationSchema;