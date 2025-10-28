import { Mastra } from "@mastra/core";
import { codingAgent } from "./agents/coding-agent";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/logger";
import { cdataMcp } from "./mcp"; // optional if you added CData MCP integration

// Use a different internal variable name to avoid conflicts
const mastraApp = new Mastra({
  agents: { codingAgent },
  mcpServers: [cdataMcp], // remove this line if not using MCP
  storage: new LibSQLStore({ url: "file:../../mastra.db" }),
  logger: new PinoLogger(),
});

// 👇 This line satisfies Mastra Cloud’s analyzer
export { mastraApp as mastra };
