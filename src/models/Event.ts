import type User from "./User";

interface Event {
    BeginDate: Date,
    EndDate: Date,
    PartyDate: Date,
    EventResposible: User,
    Description: string,
}

export default Event