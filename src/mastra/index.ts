import { Mastra } from "@mastra/core";
import { codingAgent } from "./agents/coding-agent";
import { LibSQLStore } from "@mastra/libsql";
import { cdataMcp } from "./mcp";

const mastraApp = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../../mastra.db" }),
});

// ✅ register MCP after startup
mastraApp.addMCPServer(cdataMcp);

export { mastraApp as mastra };
