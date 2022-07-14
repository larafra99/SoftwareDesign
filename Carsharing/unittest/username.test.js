import { checkRegex } from "../function/regex";
const username = "username";
const password = "abc123";
describe("This is a RegEx", () => {
    test("Check for valid Username", () => {
        expect(checkRegex(username, "username")).toBe(true);
    });
});
describe("This is a RegEx", () => {
    test("Check for valid Password", () => {
        expect(checkRegex(password, "password")).toBe(true);
    });
});
//# sourceMappingURL=username.test.js.map