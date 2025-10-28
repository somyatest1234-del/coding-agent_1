import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { PinoLogger } from '@mastra/loggers';
import { codingAgent } from './agents/coding-agent';
import "dotenv/config";

export const mastra = new Mastra({
  agents: { codingAgent },
  mcpServers: {
    cdata: {
      type: "http",
      url: new URL(process.env.CDATA_MCP_URL!),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.CDATA_USERNAME}:${process.env.CDATA_PAT}`
          ).toString("base64"),
      },
    },
  },
})
  storage: new LibSQLStore({ url: 'file:../../mastra.db' }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  }),
  observability: {
    default: {
      enabled: true,
    },
  },
});
