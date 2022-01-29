const fetch = require("node-fetch");
import "dotenv/config";
import AppError from '../models/appError';

//TODO: test this function!!

const fetchContacts = async (fromStart: boolean) => {
    try {
        const memberListId = "1a2d7ebf82";
        const key = process.env.MAILCHIMP_API_KEY || ''
        const encodedKey = Buffer.from('anystring:' + key).toString('base64')
        const dateTime = new Date();
        const interval = 1 // in minutes, should move this
        const sinceTime = new Date(dateTime.setMinutes(dateTime.getMinutes() - interval)).toISOString()
        let url;

        if(fromStart) {
            url = `${process.env.MAILCHIMP_SERVER}/lists/${memberListId}/members?before_last_changed=${dateTime.toISOString()}`
        } else {
            url = `${process.env.MAILCHIMP_SERVER}/lists/${memberListId}/members?since_last_changed=${sinceTime}`
        }

        return fetch(url, {
            headers: {
                'Authorization': 'Basic ' + encodedKey
            }
        }).then((res: any) => res.json())
    } catch(error) {
        return new AppError("Cannot fetch members info");
    }
};

export default fetchContacts;
