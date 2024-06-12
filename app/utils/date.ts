import { DateTime } from "luxon";

const customiseRelativeDate = (relativeDate: string | null) => {
  if (relativeDate) {
    return relativeDate
      .replace("hours", "hrs")
      .replace("hour", "hr")
      .replace("minutes", "min")
      .replace("minute", "min")
      .replace("seconds", "sec")
      .replace("second", "sec");
  }
};

export const formatDate = (dateString: string, format = "") => {
  const date = DateTime.fromISO(dateString);

  if (format) {
    return date.toFormat(format);
  }

  //if date within 7 days
  const now = DateTime.now();

  if (date.hasSame(now, "day")) {
    return customiseRelativeDate(date.toRelative());
  }

  //if yesterday
  else if (date.hasSame(now.minus({ days: 1 }), "day")) {
    return "Yesterday";
  }

  //if this week
  else if (date > now.minus({ days: 6 })) {
    //EEE => days of week short form
    return date.toFormat("EEE");
  }

  //older than a week show full date
  else {
    return date.toFormat("dd/MM/yy");
  }
};
