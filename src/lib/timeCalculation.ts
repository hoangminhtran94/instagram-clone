export const timeAgoOrDayAgo = (
  datetime: Date,
  options?: {
    dayText?: string;
    daysText?: string;
    hourText?: string;
    hoursText?: string;
    minText?: string;
    minsText?: string;
    secText?: string;
  }
) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(datetime).getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (options) {
    if (days >= 1) {
      if (days === 1) {
        return options.dayText ?? "1 day ago";
      }
      return `${days}  ${options.daysText ?? "days ago"}`;
    } else if (hours >= 1) {
      if (hours === 1) {
        return options.daysText ?? "1h";
      }
      return `${hours} ${options.hoursText ?? "h"}`;
    } else if (minutes >= 1) {
      if (minutes === 1) {
        return options.minText ?? "1 min";
      }
      return `${minutes}  ${options.minsText ?? "mins"}`;
    } else {
      if (seconds <= 10) {
        return "just now";
      }
      return `${seconds}  ${options.secText ?? "seconds"}`;
    }
  } else {
    if (days >= 1) {
      if (days === 1) {
        return "1 day ago";
      }
      return days + " days ago";
    } else if (hours >= 1) {
      if (hours === 1) {
        return "1h";
      }
      return hours + "h";
    } else if (minutes >= 1) {
      if (minutes === 1) {
        return "1 min";
      }
      return minutes + " mins";
    } else {
      if (seconds <= 10) {
        return "just now";
      }
      return seconds + " seconds";
    }
  }
};
