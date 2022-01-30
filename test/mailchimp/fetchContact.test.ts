import fetchContacts from "../../src/mailchimp/fetchContact";
import axios, { AxiosResponse } from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchContacts", () => {
  test("returns data from beginning when fromStart=true", async () => {
    const config = {
      apiKey: "",
      host: "",
    };
    const response = require("./test-data.json");

    mockedAxios.get.mockResolvedValueOnce(response);

    const result = await fetchContacts(true, config)
    console.log(result, ">>>>>>>>>>>>>>>>>>>>");

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.members).toHaveLength(10);
  });
});
