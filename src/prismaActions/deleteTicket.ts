"use server";

import prisma from "@/libs/db";

export const deleteTicket = async (id: string) => {
  try {
    await prisma.ticket.delete({
      where: { id },
    });
  } catch (err: unknown) {
    throw new Error("Failed to delete ticket");
  }
};
