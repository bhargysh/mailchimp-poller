import axios, { AxiosResponse } from "axios";
import "dotenv/config";
import transformError from "../utils";

const fetchContacts = async (fromStart: boolean) => {
  try {
    const memberListId = "1a2d7ebf82";
    const key = process.env.MAILCHIMP_API_KEY || "";
    const server = process.env.MAILCHIMP_SERVER || "";
    const encodedKey = Buffer.from("anystring:" + key).toString("base64");
    const dateTime = new Date();
    const interval = 1; // in minutes, should move this to config
    const sinceTime = new Date(
      dateTime.setMinutes(dateTime.getMinutes() - interval)
    ).toISOString();
    let url;

    if (fromStart) {
      url = `${server}lists/${memberListId}/members?before_last_changed=${dateTime.toISOString()}`;
    } else {
      url = `${server}lists/${memberListId}/members?since_last_changed=${sinceTime}`;
    }

    return axios.get(url, {
      headers: {
        Authorization: "Basic " + encodedKey,
      },
    }).then((res: AxiosResponse) => {
        return res.data;
    });

  } catch (error) {
    transformError(error, "fetchContacts", "Cannot fetch members info");
  }
};

export default fetchContacts;
