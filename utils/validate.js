import Validator from 'validatorjs'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

// Tighten password policy
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');
    
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export const validateValue = (value,regx) => regx.test(value)


export const validateToken = (token) => jwt.verify(token,process.env.JWT_SECRET)


export default validator;