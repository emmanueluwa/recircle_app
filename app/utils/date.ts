import { DateTime } from "luxon";

export const formatDate = (dateString: string, format = "") => {
  if (format) {
    const date = DateTime.fromISO(dateString);
    if (format) {
      return date.toFormat(format);
    }
  }
};
