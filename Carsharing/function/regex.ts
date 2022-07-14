export function checkRegex (checkString: string, checkFor: string): boolean {
  //check if username is valid
    if (checkFor == "username") {
      const regexuser: RegExp = /^[A-Za-z][A-Za-z0-9_]/;
      if (regexuser.test(checkString) == true) {
        return true;
      };
    }
    // check if password is valid
    if (checkFor == "password") {
      const regexpassword: RegExp = /^.{4,8}$/;
      if (regexpassword.test(checkString) == true) {
        return true;
      };
    }

    return false;
  }
  