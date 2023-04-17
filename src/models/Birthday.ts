import type Guest from "./Guest";
import type User from "./User";

interface Birthday {
    BeginDate: Date,
    EndDate: Date,
    PartyDate: Date,
    BirthdayUser: User,
    Description: string,
    Guests: Guest[]
}

export default Birthday