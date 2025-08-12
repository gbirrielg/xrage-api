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
  overall_report: z.string(),
  risk_level: z.number()
});


export async function gpt(tweets) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  /* Reading in prompt file and formatting tweet arr */
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const instructionsPath = path.join(__dirname, 'prompt.md');
  const instructions = await fs.readFile(instructionsPath, 'utf-8');
  const formatted = tweets.map((tweet, i) => `Tweet ${i + 1}: ${tweet}`).join('\n');

  /* gpt call */
  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    instructions,
    input: formatted,
    text: {
      format: zodTextFormat(report, "report")
    }
  });
  
  return JSON.parse(response.output_text);
}
