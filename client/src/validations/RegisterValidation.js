import * as yup from 'yup'
import axios from 'axios'

const errors = {
    invalidEmail: 'Must enter a valid e-mail address.',
    noEmail: 'Please enter your e-mail address.',
    shortUsername: 'Username must have a minimum of 6 characters.',
    longUsername: 'Username has a maximum of 12 characters.',
    noUsername: 'Please enter a username.',
    shortPassword: 'Password must have a minimum of 6 characters.',
    longPassword: 'Maximum characters allowed is 18 characters.',
    noPassword: 'Please enter a password',
    wrongConfirm: 'Passwords must match.',
    noConfirm: 'Please confirm your password.'
}

export const registrationSchema = yup.object().shape({
    email: yup
    .string()
    .email(errors.invalidEmail)
    .test('emailDuplicateCheck', 'E-Mail already in use.', async email => {
        return await axios.get(`http://localhost:3001/users/check/${email}`, { email: email })
        .then(res => {
            if(res.data.length > 0)
                return false;
            return true;
        })
        .catch(err => {
            console.log(err);
        })
    })
    .required(errors.noEmail),
    username: yup
    .string()
    .min(6, errors.shortUsername)
    .max(12, errors.longUsername)
    .test('usernameDuplicateCheck', 'Username already taken!', async username => {
        return await axios.get(`http://localhost:3001/users/check/${username}`)
        .then(res => {
            if(res.data.length > 0)
                return false;
            return true;
        })
        .catch(err => {
            console.log(err);
        })
    })
    .required(errors.noUsername),
    password: yup
    .string()
    .min(6, errors.shortPassword)
    .max(18, errors.longPassword)
    .required(errors.noPassword),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], errors.wrongConfirm)
    .required(errors.noConfirm)
})
