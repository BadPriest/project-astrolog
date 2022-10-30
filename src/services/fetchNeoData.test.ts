import { getQueryQueue, IQueryNEOData } from "./fetchNeoData";

test("A range within 7 days should return a single item in request queue", () => {
  const mockQuery = {
    startDate: new Date(2035, 1, 1),
    endDate: new Date(2035, 1, 5),
  } as IQueryNEOData;

  const actualResult = getQueryQueue(mockQuery);
  const expected = [mockQuery];

  expect(actualResult).toEqual(expected);
});

test("A query exceeding 7 days should return a proper queue", () => {
  const mockQuery = {
    startDate: new Date("2035-02-01"),
    endDate: new Date("2035-02-28"),
  } as IQueryNEOData;

  const actualResult = getQueryQueue(mockQuery);
  const expected = [
    {
      startDate: new Date("2035-02-01"),
      endDate: new Date("2035-02-08"),
    },
    {
      startDate: new Date("2035-02-09"),
      endDate: new Date("2035-02-16"),
    },
    {
      startDate: new Date("2035-02-17"),
      endDate: new Date("2035-02-24"),
    },
    {
      startDate: new Date("2035-02-25"),
      endDate: new Date("2035-02-28"),
    },
  ] as IQueryNEOData[];

  expect(actualResult).toStrictEqual(expected);
});
