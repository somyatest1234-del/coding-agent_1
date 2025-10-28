import { Mastra } from "@mastra/core";
import { codingAgent } from "./agents/coding-agent";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/logger";
import { cdataMcp } from "./mcp"; // if you added MCP integration

export const mastraApp = new Mastra({
  agents: { codingAgent },
  mcpServers: [cdataMcp], // optional if you’re registering MCP
  storage: new LibSQLStore({ url: "file:../../mastra.db" }),
  logger: new PinoLogger(),
});
