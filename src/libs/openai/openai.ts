import OpenAI from "openai";
import { getSystemMessage } from "@/app/utilites/getSystemMessage";
import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";

const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (
  description: string,
  name: string,
  status: TicketStatus,
) => {
  const systemMessage = getSystemMessage(status, name, description);

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        { role: "user", content: description },
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1000,
      n: 1,
    });
    console.log("chatCompletion", chatCompletion);

    return chatCompletion?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("Error in getAIResponse:", error);
    throw error;
  }
};
