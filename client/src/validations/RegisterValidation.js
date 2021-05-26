import * as yup from 'yup'

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
    email: yup.string().email(errors.invalidEmail).required(errors.noEmail),
    username: yup.string().min(6, errors.shortUsername).max(12, errors.longUsername).required(errors.noUsername),
    password: yup.string().min(6, errors.shortPassword).max(18, errors.longPassword).required(errors.noPassword),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], errors.wrongConfirm).required(errors.noConfirm)
})