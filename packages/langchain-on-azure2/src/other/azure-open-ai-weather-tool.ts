import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { AIMessage } from '@langchain/core/messages';

const getWeather = tool((input) => {
  if (['sf', 'san francisco'].includes(input.location.toLowerCase())) {
    return 'It\'s 60 degrees and foggy.';
  } else {
    return 'It\'s 90 degrees and sunny.';
  }
}, {
  name: 'get_weather',
  description: 'Call to get the current weather.',
  schema: z.object({
    location: z.string().describe("Location to get the weather for."),
  })
})

const getCoolestCities = tool(() => {
  return 'nyc, sf';
}, {
  name: 'get_coolest_cities',
  description: 'Get a list of coolest cities',
  schema: z.object({
    noOp: z.string().optional().describe("No-op parameter."),
  })
})

const tools = [getWeather, getCoolestCities]
const toolNode = new ToolNode(tools)

const messageWithSingleToolCall = new AIMessage({
    content: "",
    tool_calls: [
      {
        name: "get_weather",
        args: { location: "sf" },
        id: "tool_call_id",
        type: "tool_call",
      }
    ]
  })

async function main(){
    const result = await toolNode.invoke({ messages: [messageWithSingleToolCall] })
    console.log(result);
}
main().catch(console.error);