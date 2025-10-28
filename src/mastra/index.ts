import "dotenv/config";
import { Mastra } from "@mastra/core";
import { codingAgent } from "./agents/coding-agent";

/**
 * Mastra App Configuration
 *
 * This file registers your agents and MCP servers with the Mastra runtime.
 * After redeploying, your Mastra Cloud Studio will automatically detect
 * both the Coding Agent and the connected CData MCP Server.
 */

export const mastra = new Mastra({
  // 🧠 Register your agents here
  agents: {
    codingAgent,
  },

  // 🌐 Register external MCP servers here
  mcpServers: {
    cdata: {
      type: "http",
      url: new URL(process.env.CDATA_MCP_URL ?? ""),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.CDATA_USERNAME}:${process.env.CDATA_PAT}`
          ).toString("base64"),
      },
    },
  },
});
