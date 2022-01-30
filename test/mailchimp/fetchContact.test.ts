import fetchContacts from '../../src/mailchimp/fetchContact';
import { when } from "jest-when";

jest.mock("../../src/mailchimp/fetchContact");

describe("fetchContacts", () => {
  it("returns data from beginning when fromStart=true", async () => {
    const config = {
      apiKey: "",
      host: "",
    };
    const response = require("./test-data.json");
    when(fetchContacts).calledWith(true, config).mockResolvedValue(response);

    return fetchContacts(true, config).then(result => {
        expect(result.members).toHaveLength(10);
    })
  });

  it("returns data from last run when fromStart=false", async () => {
    const config = {
      apiKey: "",
      host: "",
    };
    const response = { members: [{ id: "test" }] }
    when(fetchContacts).calledWith(false, config).mockResolvedValue(response);

    return fetchContacts(true, config).then(result => {
        expect(result.members).toHaveLength(10);
    })
  });
});
