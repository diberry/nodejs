import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
});

const getWeather = tool(async ({ location }) => {
  const lowercaseLocation = location.toLowerCase();
  if (lowercaseLocation.includes("sf") || lowercaseLocation.includes("san francisco")) {
    return "It's sunny!";
  } else if (lowercaseLocation.includes("boston")) {
    return "It's rainy!";
  } else {
    return `I am not sure what the weather is in ${location}`;
  }
}, {
  name: "getWeather",
  schema: z.object({
    location: z.string().describe("location to get the weather for"),
  }),
  description: "Call to get the weather from a specific location."
});

const tools = [getWeather];