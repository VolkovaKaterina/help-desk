import { z } from "zod";
import { createTicketSchema } from "@/app/schemas/ticketsFormSchema";
import { Ticket } from ".prisma/client";

type FormData = z.infer<typeof createTicketSchema>;

export const createTicket = async (formData: FormData) => {
  try {
    const response = await fetch("/api/create-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createTicket service:", error);
    throw error;
  }
};

export const getTicket = async (ticketId: string) => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch ticket error:", error);
    throw error;
  }
};

export const updateTicketWithAI = async (ticket: Ticket) => {
  try {
    const response = await fetch("/api/tickets/update-with-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in updateTicketWithAI:", error);
    throw error;
  }
};

export const updateTicket = async (ticket: Ticket) => {
  try {
    const response = await fetch(`/api/tickets/${ticket.id}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in updateTicketWithAI:", error);
    throw error;
  }
};
