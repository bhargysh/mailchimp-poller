import axios from "axios";
import "dotenv/config";
import { OmetriaContact } from "../models/ometriaContact";
import transformError from "../utils";

const postToOmetria = async (contacts: OmetriaContact[]) => {
  if (contacts.length === 0) return;

  const url = process.env.OMETRIA_SERVER || "";
  const key = process.env.OMETRIA_API_KEY || "";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": key,
  };

  try {
    const res = await axios.post(
      url,
      {
        data: JSON.stringify(contacts),
      },
      {
        headers: headers,
      }
    );

    console.log(`Ometria API status code: ${res.status}`, '\n');
    return res;
  } catch (error: unknown) {
    transformError(
      error,
      "postToOmetria",
      "Failed to write contacts to Ometria API, with status"
    );
  }
};

export default postToOmetria;
