import {checkregex} from "../function/regex";
const username: string = "username";
const password: string = "abc123";

describe("This is a RegEx", () => {
  test("Check for valid Username", () => {
    expect(checkregex(username, "username")).toBe(true);
  });
});

describe("This is a RegEx", () => {
  test("Check for valid Password", () => {
    expect(checkregex(password, "password")).toBe(true);
  });
});
