import { Client } from "@modelcontextprotocol/sdk/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { CallToolResultSchema, ListToolsRequest, ListToolsResultSchema, Tool } from "@modelcontextprotocol/sdk/types.js";


export class MCPClient {
    client: Client | null = null;
    transport: StreamableHTTPClientTransport | null = null;
    tools: Tool[] = [];
    serverUrl = new URL('http://127.0.0.1:8000/mcp')
    sessionId: string | undefined = undefined
    
    constructor() {}

    async connect(url?: string) {
        if (this.client) {
            console.log('Already Connected, Disconnect first')
            return;
        }

        if (url)
            this.serverUrl = new URL(url);

        console.log(`Connecting to ${this.serverUrl}...`);

        try {
            this.client = new Client(
                {
                    name: 'mcp-client',
                    version: '1.0.0'
                },
                {
                    capabilities: {}
                }
            );

            this.transport = new StreamableHTTPClientTransport(this.serverUrl, { sessionId: this.sessionId })
            await this.client.connect(this.transport)
            this.sessionId = this.transport.sessionId
            console.log('Transport created with session ID:', this.sessionId);
            console.log('Connected to MCP server');
        } catch (e) {
            console.error('Failed to connect:', e);
            this.client = null;
            this.transport = null;
        }
    }

    async disconnect(): Promise<void> {
        if (!this.client || !this.transport) {
            console.log('Not connected.');
            return;
        }

        try {
            await this.transport.close();
            console.log('Disconnected from MCP server');
            this.client = null;
            this.transport = null;
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    }


    async ping() {
        await this.client?.ping().then((result) => console.log('✅ PING' + result))
    }
    async listTools() {
        console.log('listTools')
        if (!this.client) {
            console.log('Not connected to server')
            return;
        }

        try {

            const toolsRequest: ListToolsRequest = {
                'method': 'tools/list',
                'params': {}
            }

            const toolsResult: any = await this.client.request(toolsRequest, ListToolsResultSchema)
            console.log('Available tools are: ')
            if (toolsResult.tools.length === 0)
                console.log("❌ No Tools avaiable")
            else {
                this.tools = toolsResult.tools
                for (let tool of this.tools) {
                    console.log(`Name: ${tool.name} , Description: ${tool.description}`)
                }
            }
        } catch (error) {
            throw error
        }
    }

    async callTool(name: string, args: {[key: string]: any}) {

        // const params: CallToolRequest = {
        //     method: 'tools/call',
        //     params: {
        //         name,
        //         arguments
        //     }
        // }

        try {

            const result = await this.client?.callTool({
                name,
                arguments: args
            }, CallToolResultSchema)

            // console.log(result)
            console.log(result)
        } catch (error) {
            throw(error)
        }
        
    }

}