// src/mastra/mcp.ts
import { MCPClient } from "@mastra/mcp";

function basicAuth(user: string, pat: string) {
  return Buffer.from(`${user}:${pat}`).toString("base64");
}

const CDATA_URL = process.env.CDATA_MCP_URL;     // e.g., https://.../mcp or http://localhost:3000/mcp
const CDATA_USER = process.env.CDATA_USERNAME!;
const CDATA_PAT = process.env.CDATA_PAT!;

// If your Connect AI instance requires headers, pass them via requestInit.
// (Mastra supports configuring remote HTTP(S) MCP servers with a URL and optional headers.)
export const cdataMcp = new MCPClient({
  id: "cdata-mcp",
  servers: {
    connectAI: {
      // If using remote HTTP/S MCP (Connect AI or your own host):
      ...(CDATA_URL
        ? {
            url: new URL(CDATA_URL),
            // If your instance needs auth via HTTP headers:
            requestInit: {
              headers: {
                // Many setups accept Basic with username:PAT; if your instance
                // is already authenticated by a signed URL, you can remove this.
                Authorization: `Basic ${basicAuth(CDATA_USER, CDATA_PAT)}`,
              },
            },
          }
        : {
            // Fallback example: start via npx (STDIO) if you prefer local process:
            // Command style taken from MCP client examples in the Mastra docs.
            command: "npx",
            args: ["-y", "@cdatasoftware/connectcloud-mcp-server"],
            env: {
              CDATA_USERNAME: CDATA_USER,
              CDATA_PAT: CDATA_PAT,
            },
          }),
    },
  },
});
