import fetchContacts from "../../src/mailchimp/fetchContact";
import AppError from "../../src/models/appError";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchContacts", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-01-31").getTime());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => jest.clearAllTimers());

  const time = "2022-01-30T23:59:00.000Z";
  const key = process.env.MAILCHIMP_API_KEY || "";
  const encodedKey = Buffer.from("anystring:" + key).toString("base64");
  const headers = {
    headers: {
      Authorization: `Basic ${encodedKey}`,
    },
  };

  it("returns data from beginning when fromStart=true", async () => {
    const response = require("./test-data.json");
    mockedAxios.get.mockResolvedValueOnce(response);

    await fetchContacts(true);
    const url = `https://us9.api.mailchimp.com/3.0/lists/1a2d7ebf82/members?before_last_changed=${time}`;

    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("returns data from last run when fromStart=false", async () => {
    const response = { members: [{ id: "test" }] };
    mockedAxios.get.mockResolvedValueOnce(response);

    await fetchContacts(false);
    const url = `https://us9.api.mailchimp.com/3.0/lists/1a2d7ebf82/members?since_last_changed=${time}`;

    expect(axios.get).toHaveBeenCalledWith(url, headers);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("returns custom error when an error occurs", async () => {
    const error = new AppError("fetchContacts", "Cannot fetch members info");
    mockedAxios.get.mockRejectedValueOnce(error);

    try {
      await fetchContacts(true);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});
