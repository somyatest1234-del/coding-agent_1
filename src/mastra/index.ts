import { Mastra } from "@mastra/core";
import { codingAgent } from "./agents/coding-agent";
import { LibSQLStore } from "@mastra/libsql";

console.log("🚀 Starting Mastra app...");

const mastraApp = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../../mastra.db" }),
});

console.log("✅ Mastra app initialized successfully.");

export { mastraApp as mastra };
