import { Mastra } from "@mastra/core";
import { codingAgent } from "./agents/coding-agent";
import { LibSQLStore } from "@mastra/libsql";

// 🚫 Temporarily remove MCP to test readiness
// import { cdataMcp } from "./mcp";

const mastraApp = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../../mastra.db" }),
  // mcpServers: [cdataMcp], // comment this out for now
});

export { mastraApp as mastra };
