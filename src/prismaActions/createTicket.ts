"use server";
import prisma from "@/libs/db";

import { z } from "zod";
import { createTicketSchema } from "@/app/schemas/ticketsFormSchema";

type FormData = z.infer<typeof createTicketSchema>;

export const createTicket = async (formData: FormData) => {
  try {
    return await prisma.ticket.create({
      data: formData,
    });
  } catch (error) {
    throw new Error("Failed to create ticket");
  }
};
