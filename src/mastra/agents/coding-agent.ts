import { Agent } from '@mastra/core/agent';
import { LibSQLStore, LibSQLVector } from '@mastra/libsql';
import { Memory } from '@mastra/memory';
import { openai } from '@ai-sdk/openai';
import {
  checkFileExists,
  createDirectory,
  createSandbox,
  deleteFile,
  getFileInfo,
  getFileSize,
  listFiles,
  readFile,
  runCode,
  runCommand,
  watchDirectory,
  writeFile,
  writeFiles,
} from '../tools/e2b';
import { fastembed } from '@mastra/fastembed';

// 🆕 Import your MCP client
import { cdataMcp } from '../mcp';

export const codingAgent = new Agent({
  name: 'Coding Agent',
  instructions: `
# Mastra Coding Agent for E2B + CData

You are an advanced coding agent that plans, writes, executes, and iterates on code in secure, isolated E2B sandboxes with comprehensive file management and workflow capabilities.

Additionally, you are connected to **CData Connect AI** via an MCP server, which allows you to:
- Query enterprise data
- Retrieve schemas, catalogs, and tables
- Execute SQL queries securely
- Access any connected data sources via CData Connect

When the user asks for information about databases or analytics, use the CData MCP tools.
Otherwise, use your normal development tools.
`,
  model: openai('gpt-4.1'),

  // 🧩 Combine both local tools + CData MCP tools dynamically
  tools: {
    createSandbox,
    runCode,
    readFile,
    writeFile,
    writeFiles,
    listFiles,
    deleteFile,
    createDirectory,
    getFileInfo,
    checkFileExists,
    getFileSize,
    watchDirectory,
    runCommand,
    ...(await cdataMcp.getTools()), // <-- Added line
  },

  memory: new Memory({
    storage: new LibSQLStore({ url: 'file:../../mastra.db' }),
    options: {
      threads: { generateTitle: true },
      semanticRecall: true,
      workingMemory: { enabled: true },
    },
    embedder: fastembed,
    vector: new LibSQLVector({ connectionUrl: 'file:../../mastra.db' }),
  }),

  defaultStreamOptions: { maxSteps: 20 },
});
