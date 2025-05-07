import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fetch from "node-fetch";
import z from "zod";

export const flightSearchToolSdk = (server: McpServer) => {
  //validation
  const params = {
    from: z.string().describe("from airport iata code"),
    to: z.string().describe("to airport iata code").optional(),
    departDate: z
      .string()
      .describe("depart date in YYYY-MM-DD format")
      .optional(),
    returnDate: z
      .string()
      .describe("return date in YYYY-MM-DD format")
      .optional(),
  };

  //tool
  server.tool("flight-search", params, async (args) => {
    try {
      const { from, to, departDate, returnDate } = args;

      const url = `https://api.flights.owenmerry.com/chatgpt/search/${from}?${
        to ? `to=${to}&` : ""
      }${departDate ? `depart=${departDate}&` : ""}${
        returnDate ? `return=${returnDate}&` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching flight data: ${response.statusText}`);
      }
      const data = (await response.json()) as {search: string};

      return {
        content: [{ type: "text", text: String(data.search) }],
      };
    } catch (error) {
      const { from, to, departDate, returnDate } = args;
      const url = `https://api.flights.owenmerry.com/chatgpt/search/${from}?${
        to ? `to=${to}&` : ""
      }${departDate ? `depart=${departDate}&` : ""}${
        returnDate ? `return=${returnDate}&` : ""
      }`;
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch flight data - ${error.message} - ${url}`,
          { cause: error }
        );
      } else {
        throw new Error(
          `Failed to fetch flight data - no error found - ${url}`,
          { cause: error }
        );
      }
    }
  });
};
