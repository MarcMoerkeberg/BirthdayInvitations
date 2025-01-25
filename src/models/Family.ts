export interface NewFamily {
    Name: string
    MemberIds: string[] | undefined
}

export interface Family extends NewFamily {
    Id: string
}