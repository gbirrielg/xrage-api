import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: "Write a two-sentence story about a student tired of studying."
  });

  console.log(response.output_text);
}

run()