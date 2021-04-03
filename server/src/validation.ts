
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
