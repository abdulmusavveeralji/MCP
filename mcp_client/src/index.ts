
import { ChatCompletion } from 'openai/resources'
import { MCPClient } from './MCPClient.js'
import { OpenAIClient } from './OpenAIClient.js'
import 'dotenv/config';



async function main() {
    // const client = new MCPClient()

    // await client.connect()
    // await client.ping()
    // await client.listTools()
    // await client.callTool('get_post_by_id', {id: 4})
    // await client.disconnect()

    console.log('Initializing openAi')
    const openai = new OpenAIClient()
    openai.chatApi2([{
        role: 'user',
        content: 'tell me a joke'
    }])
}

main().catch((error: unknown) => {
    console.error('Error Running MCP Client')
})