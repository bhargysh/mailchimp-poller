const fetch = require("node-fetch");
import "dotenv/config";
import AppError from '../models/appError';

const fetchContacts = async () => {
    try {
        const memberListId = "1a2d7ebf82";
        const key = process.env.MAILCHIMP_API_KEY || ''
        const encodedKey = Buffer.from('anystring:' + key).toString('base64')

        return fetch(`${process.env.MAILCHIMP_SERVER}/lists/${memberListId}/members`, {
            headers: {
                'Authorization': 'Basic ' + encodedKey
            }
        }).then((res: any) => res.json())
    } catch(error) {
        return new AppError("Cannot fetch members info");
    }
};

export default fetchContacts();
