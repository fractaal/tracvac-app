import {UserModel} from "./database/models/UserModel";

export function validateUsername (username: string) {
    const re = /\s+/;
    return !re.test(String(username).toLowerCase());
}

export function validateEmail (email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateDate (date: string) {
    const isValid = !isNaN(new Date(String(date)).getTime());
    const isNotInTheFuture = (Date.now() - new Date(String(date)).getTime()) > 0;
    return (isValid && isNotInTheFuture);
}

export function validateNumber (number: string) {
    const _number = String(number)
    if (!(/^\d+$/.test(_number))) return false
    if (_number[0] === '0') {
        if (_number.length === 11) {
            return true
        }
    }
    return false
}

export function userValidator (user: UserModel, type: 'register' | 'update'): [result: boolean, message: string] {
    if (!validateUsername(user.username) && type === 'register') {
        return [false, "Your username is invalid."];
    } else if (!validateEmail(user.email) && type === 'register') {
        return [false, "Your email is invalid."]
    } else if (!validateDate(user.dateOfBirth)) {
        return [false, "Your birth date is invalid."]
    } else if (Object.prototype.hasOwnProperty.call(user, "covidDate") && !validateDate(user.covidDate)) {
        return [false, "Your COVID date is invalid."]
    } else if (!validateNumber(user.contactNumber) || !validateNumber(user.employerContactNumber)) {
        return [false, "Contact numbers are invalid."]
    }
    return [true, "Validation passed!"]
}
