import type { Timestamp } from "firebase/firestore"

export function formatFullDate(date: Timestamp): string {
    let formattedDate = Intl.DateTimeFormat('da-DK', { dateStyle: 'full', timeStyle: 'short' }).format(date.toDate())
    formattedDate = upperCaseFirstChar(formattedDate)
    formattedDate = removeCurrenYearFromString(formattedDate, date)

    return formattedDate
}

const upperCaseFirstChar = (string: string): string => { return string.charAt(0).toLocaleUpperCase() + string.slice(1) }
const removeCurrenYearFromString = (string: string, date: Timestamp): string => { return string.replace(date.toDate().getFullYear().toString() + ' ', '') }

/* This only works for a range in a single month (it uses the toDate for now) */
export function formatDateRange(fromDate: Timestamp, toDate: Timestamp): string {
    const fromDateRange = fromDate.toDate().getDate()
    const toDateRange = toDate.toDate().getDate()
    const month = upperCaseFirstChar(Intl.DateTimeFormat('da-DK', { month: 'long' }).format(toDate.toDate()))

    return `d. ${fromDateRange}-${toDateRange} ${month}`
}