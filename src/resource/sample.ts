import { FastMCP } from "fastmcp";

export const logResource = (server: FastMCP) => {
    server.addResource({
        async load() {
          return {
            text: "Example log content",
          };
        },
        mimeType: "text/plain",
        name: "Application Logs",
        uri: "file:///logs/app.log",
      });
}

