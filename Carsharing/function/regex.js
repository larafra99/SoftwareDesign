export function checkRegex(checkString, checkFor) {
    //check if username is valid
    if (checkFor == "username") {
        const regexuser = /^[A-Za-z][A-Za-z0-9_]/;
        if (regexuser.test(checkString) == true) {
            return true;
        }
        ;
    }
    // check if password is valid
    if (checkFor == "password") {
        const regexpassword = /^.{4,19}$/;
        if (regexpassword.test(checkString) == true) {
            return true;
        }
        ;
    }
    return false;
}
//# sourceMappingURL=regex.js.map