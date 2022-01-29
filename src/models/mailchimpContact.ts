import { Status } from './status';

export type MailchimpContact = {
    id: string,
    full_name: string,
    email_address: string,
    status: Status
}
