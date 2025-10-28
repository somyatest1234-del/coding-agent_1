import { MCPServer } from "@mastra/mcp";

export const cdataMcp = new MCPServer({
  name: "cdata",
  type: "http",
  url: "https://mcp.cloud.cdata.com/mcp",
  headers: {
    Authorization: "Basic <base64-encoded somyas@cdata.com:BHLzWMjqc8sU6MyxYOBgK9MerwK/Zge7POqeRe3m80CN3/zx>",
  },
});
