import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();


/* structured response schema */
const report = z.object({
  political: z.number(),
  insult: z.number(),
  threat: z.number(),
  profanity: z.number(),
  toxicity: z.number(),
  overall_report: z.string()
});


async function run() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const instructionsPath = path.join(__dirname, 'prompt.md');
  const instructions = await fs.readFile(instructionsPath, 'utf-8');

  const tweets = ["These god damn people are ruining this country", "Wow, colored me surprised. It's always these kinds of fucking people"];
  const formatted = tweets.map((tweet, i) => `Tweet ${i + 1}: ${tweet}`).join('\n');

  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    instructions,
    input: formatted,
    text: {
      format: zodTextFormat(report, "report")
    }
  });

  const jsonedOutput = JSON.parse(response.output_text)
  console.log(jsonedOutput);
}

run()