import axios, { AxiosResponse } from "axios";
import "dotenv/config";
import transformError from "../utils";
import { Config } from '../models/config';

const fetchContacts = async (fromStart: boolean, config: Config) => {
  try {
    const memberListId = "1a2d7ebf82";
    const encodedKey = Buffer.from("anystring:" + config.apiKey).toString("base64");
    const dateTime = new Date();
    const interval = config.pollDuration || 0
    const sinceTime = new Date(
      dateTime.setMinutes(dateTime.getMinutes() - interval)
    ).toISOString();
    let url;

    if (fromStart) {
      url = `${
        config.host
      }/lists/${memberListId}/members?before_last_changed=${dateTime.toISOString()}`;
    } else {
      url = `${process.env.MAILCHIMP_SERVER}/lists/${memberListId}/members?since_last_changed=${sinceTime}`;
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
