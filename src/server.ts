
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

//tools
import { flightSearchToolSdk } from "./tools/flight-search-sdk.js";

const server = new McpServer({
  name: "flight-search-server",
  version: "1.0.0"
});

//register tools
flightSearchToolSdk(server);

const transport = new StdioServerTransport();
await server.connect(transport);