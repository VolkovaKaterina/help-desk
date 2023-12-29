import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { simulateEmailSending } from "@/app/utilites/simulateEmailSending";

export const GET = async (request: NextRequest) => {
  try {
    const ticketId = request.nextUrl.pathname.split("/").pop();

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return new NextResponse(JSON.stringify({ message: "Ticket not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await simulateEmailSending(ticket);

    return new NextResponse(JSON.stringify(ticket), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      },
    );
  }
};
