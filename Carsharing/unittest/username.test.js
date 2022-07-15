import { HelpFunktions } from "../class/function.js";
const username = "username";
const password = "abc123";
describe("This is a RegEx", () => {
    test("Check for valid Username", () => {
        expect(HelpFunktions.checkRegex(username, "username")).toBe(true);
    });
});
describe("This is a RegEx", () => {
    test("Check for valid Password", () => {
        expect(HelpFunktions.checkRegex(password, "password")).toBe(true);
    });
});
//# sourceMappingURL=username.test.js.map