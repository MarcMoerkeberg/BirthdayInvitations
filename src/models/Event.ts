import type User from "./User";

interface Event {
    Name: string,
    Subtitle?: string,
    BeginDate: Date,
    EndDate: Date,
    PartyDate: Date,
    Description: string,
    EventResposible?: Array<User>,
}

export default Event