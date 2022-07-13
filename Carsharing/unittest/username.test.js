import { checkregex } from "../function/regex";
const username = "username";
const password = "abc123";
describe("This is a RegEx", () => {
    test("Check for valid Username", () => {
        expect(checkregex(username, "user")).toBe(true);
    });
});
describe("This is a RegEx", () => {
    test("Check for valid Password", () => {
        expect(checkregex(password, "password")).toBe(true);
    });
});
//# sourceMappingURL=username.test.js.map