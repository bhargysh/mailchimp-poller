const fetch = require("node-fetch");
import express from "express";
import "dotenv/config";
import AppError from "./models/AppError";

const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});

const mailChimpResponse = () => {
    const memberListId = "1a2d7ebf82";
    const key = process.env.MAILCHIMP_API_KEY || '' //TODO: error handling
    const encodedKey = Buffer.from('anystring:' + key).toString('base64')
    return fetch(`${process.env.MAILCHIMP_SERVER}/lists/${memberListId}/members`, {
        headers: {
            'Authorization': 'Basic ' + encodedKey
        }
    }).then((res: any) => res.json())
};


const run: () => Promise<void> = async () => {
    try {
        const response = await mailChimpResponse();
        console.log(response);
    } catch (e) {
        throw new AppError("Cannot fetch members info");
    }
};

run();

