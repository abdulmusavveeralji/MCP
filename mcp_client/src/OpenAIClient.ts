import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export class OpenAIClient {
    openAIClient: OpenAI | null = null;
    model = process.env.model

    constructor() {
        this.initClient()
    }

    initClient() {
        console.log('ENV: ', process.env.BASE_URL)
        this.openAIClient = new OpenAI({
            baseURL: process.env.BASE_URL,
            apiKey: process.env.API_KEY
        })
    }


    async chat(content: ChatCompletionMessageParam[] = []) {
        

        const response = await this.openAIClient?.chat.completions.create({
            messages: content,
            model: 'gpt-4o-mini',
            temperature: 0.2
        }).catch((error) => console.error(error));

        console.log(`response: ${response?.choices[0]?.message.content}`)
    }

    async chatApi2(content: ChatCompletionMessageParam[]) {
        this.openAIClient?.responses.create(
            {
                model: 'gpt-4o-mini',
                input: 'Tell me a joke',
                tools: [],
                store: false
            }
        )
    }

    async chatApi3(content: ChatCompletionMessageParam[]) {
        const conversations = this.openAIClient?.conversations.create();
    }

    // async vectorStore() {
    //     this.openAIClient?.vectorStores.files.
    // }




}