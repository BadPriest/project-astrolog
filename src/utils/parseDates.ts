import { format, parse } from "date-fns";

export const parseDateForAPI = (date: Date, formatTo = "yyyy-MM-dd") =>
  format(date, formatTo);

export const parseDateForDisplay = (
  date: string,
  formatIs = "yyyy-MM-dd",
  formatTo = "dd.MM.yyyy"
) => {
  const parsed = parseDate(date, formatIs);
  return format(parsed, formatTo);
};

export const parseDate = (date: string, formatIs = "dd.MM.yyyy") =>
  parse(date, formatIs, new Date());

export default parseDateForAPI;
