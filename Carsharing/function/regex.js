export function checkregex(checkString, checkFor) {
    if (checkFor == "username") {
        const regExUser = /^[A-Za-z][A-Za-z0-9_]/;
        if (regExUser.test(checkString) == true) {
            return true;
        }
        ;
    }
    if (checkFor == "password") {
        const regExPassword = /^.{4,8}$/;
        if (regExPassword.test(checkString) == true) {
            return true;
        }
        ;
    }
    return false;
}
//# sourceMappingURL=regex.js.map