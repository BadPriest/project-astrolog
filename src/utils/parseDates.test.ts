import parseDateForAPI from "./parseDates";

test("parseDateForAPI parses date correctly", () => {
  const mockValue = new Date('01/01/1900');
  const expected = "1900-01-01";
  const actual = parseDateForAPI(mockValue);

  expect(actual).toEqual(expected);
});
