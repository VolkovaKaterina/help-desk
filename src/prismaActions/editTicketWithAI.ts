"use server";
import { editTicket } from "@/prismaActions/index";
import { Ticket } from ".prisma/client";
import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";
import { getAIResponse } from "@/libs/openai/openai";

export const editTicketWithAI = async (ticket: Ticket) => {
  try {
    let aiResponse;
    try {
      aiResponse = await getAIResponse(
        ticket.description,
        ticket.name,
        ticket.status as TicketStatus,
      );
    } catch (error) {
      aiResponse = null;
    }

    const adminResponse = aiResponse || "Default admin response";

    const updatedTicket = {
      ...ticket,
      adminResponse: adminResponse,
    };

    return await editTicket(updatedTicket);
  } catch (e) {
    throw new Error("Failed to update Ticket with AI");
  }
};
