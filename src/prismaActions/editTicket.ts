"use server";
import prisma from "@/libs/db";
import { editTicketSchema } from "@/app/schemas/ticketsFormSchema";

interface EditTicketFormData {
  id: string;
  status: string;
  adminResponse: string;
  needDirectContact?: string;
}

export const editTicket = async (formData: EditTicketFormData) => {
  const result = editTicketSchema.safeParse(formData);

  if (!result.success) {
    throw new Error("Validation Error");
  }

  try {
    return await prisma.ticket.update({
      where: { id: result.data.id },
      data: {
        status: result.data.status,
        adminResponse: result.data.adminResponse,
        updatedAt: new Date(),
        needDirectContact: result.data.needDirectContact,
      },
    });
  } catch (error) {
    throw new Error("Failed to update ticket");
  }
};
