import { Status } from "./status"

export type OmetriaContact = {
    id: string,
    firstname?: string,
    lastname?: string,
    email: string,
    status: Status
}
