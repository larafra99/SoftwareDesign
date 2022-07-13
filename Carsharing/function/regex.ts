export function checkregex (checkString: string, checkFor: string): boolean {
    if (checkFor == "username") {
      const regExUser: RegExp = /^[A-Za-z][A-Za-z0-9_]$/;
      if (regExUser.test(checkString) == true) {
        return true;
      };
    }

    if (checkFor == "password") {
      const regExPassword: RegExp = /^.{4,8}$/;
      if (regExPassword.test(checkString) == true) {
        return true;
      };
    }

    return false;
  }
  