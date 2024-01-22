import { formatDistanceToNow } from "date-fns";

export const perfectDate = (data: string) => {
    const utcDate = new Date(data);
    // this is a specific timezone for Bulgaria, Sofia
    const timezoneOffset = 120;
    const targetDate = new Date(utcDate.getTime() + timezoneOffset * 60000);
    const formattedDistance = formatDistanceToNow(targetDate);
    return formattedDistance;
}