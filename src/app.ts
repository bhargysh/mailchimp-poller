import Server from "./server/expressServer";
import fetchContacts from "./mailchimp/fetchContact";
import AppError from "./models/appError";
import convertToOmetria from "./transformer/transformMailchimp";

const server = new Server();
server.start();

const poll = async () => {
    try {
        const response = await fetchContacts;
        const result = convertToOmetria(response.members)
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

