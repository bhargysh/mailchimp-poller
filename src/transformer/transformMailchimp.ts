import { MailchimpContact } from "../models/mailchimpContact";
import { OmetriaContact } from "../models/ometriaContact";

function convertToOmetria(rawMembersList: MailchimpContact[]): OmetriaContact[] {
    return rawMembersList.map((member) => {
        const transformedModel: OmetriaContact = {
            id: member.id,
            email: member.email_address,
            status: member.status
        }
        const [firstname, lastname] = member.full_name.split(' ', 2)

        return firstname.length === 0 || lastname.length === 0 ? transformedModel : {
            ...transformedModel,
            firstname,
            lastname
        }
    })
}

export default convertToOmetria;
