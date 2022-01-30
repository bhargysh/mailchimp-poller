import fetchContacts from "./mailchimp/fetchContact";
import AppError from "./models/appError";
import convertToOmetria from "./transformer/transformMailchimp";
import { getState, setState } from "./state";
import postToOmetria from "./ometria/postToApi";
import "dotenv/config";

// Atm, the poll only fetches historical data the first time app starts and re-fetches every time
// it restarts...could introduce env variable that sets it when app runs

// Could also do batched transformations and post for higher volume data, also hardcoded for one member right now
// TODO: Add README with reflection
// TODO: add a config interface

// TODO: Test fetchContacts & postToOmetria

const mailchimpConfig = () => {
  const key = process.env.MAILCHIMP_API_KEY || "";
  const host = process.env.MAILCHIMP_SERVER || "";
  const duration = process.env.POLL_DURATION || "10000";
  return {
    apiKey: key,
    host: host,
    pollDuration: parseInt(duration)
  }
}

const poll = async () => {
  try {
    const response = await fetchContacts(getState(), mailchimpConfig());
    const ometriaContacts = convertToOmetria(response.members);
    console.log(`Fetched ${ometriaContacts.length} contacts`);

    await postToOmetria(ometriaContacts);
    console.log("Finished Posting contacts data to Ometria API!", '\n', '\n');

    console.log("Polling for new data...");
    const duration = Number(process.env.POLLING_DURATION) || 60000;
    setTimeout(() => {
      setState(false);
      poll();
    }, duration);
  } catch (error: unknown) {
    switch (error) {
      case error instanceof AppError:
        throw error;
      case error instanceof Error:
        throw error;
      default:
        throw new Error("Unknown error occurred");
    }
  }
};

poll();
