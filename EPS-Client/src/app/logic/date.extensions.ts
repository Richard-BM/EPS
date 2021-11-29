import { TranslateService } from '@ngx-translate/core';

export function getWeekNumber(d: Date) {
    d = new Date(d);
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

export function getWeekDayShort(d: Date, translateService: TranslateService) {

    let days: string = translateService.instant("WEEKDAYSSHORT");
    let daysArray = days.split(";");

    return daysArray[new Date(d).getDay()];
}

export function timeStringToDate(timeString: string) {

    if (timeString) {
        let parts = timeString.split(":");
        let hours = parts.length > 0 ? parseInt(parts[0]) : 0;
        let minutes = parts.length > 1 ? parseInt(parts[1]) : 0;
        let seconds = parts.length > 2 ? parseInt(parts[2]) : 0;

        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);

        return date;
    }
    else
        return null;
}

export function dateToTimeString(date: Date, setSecondsToZero: boolean) {

    if (date)
        return date.getHours() + ":" + date.getMinutes() + ":"
            + (setSecondsToZero ? "00" : date.getSeconds());
    else
        return null;
}