import Server from "./server/expressServer";
import fetchContacts from "./mailchimp/fetchContact";
import AppError from "./models/appError";
import convertToOmetria from "./transformer/transformMailchimp";
import { getState, setState } from './state';

const server = new Server();
server.start();

const poll = async () => {
    try {
        const response = await fetchContacts(getState());
        const result = convertToOmetria(response.members);

        console.log('-----------------------');
        console.log('Waiting for 10 seconds...');

        setTimeout(() => {
            setState(false);
            console.log('-----------------------');
            console.log('Re-invoking polling function!');
            poll();
        }, 10000);

        //TODO: post to ometria API & error handling
        console.log(result.length);
    } catch (error: unknown) {
        if(error instanceof AppError) {
            throw error;
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

poll();
