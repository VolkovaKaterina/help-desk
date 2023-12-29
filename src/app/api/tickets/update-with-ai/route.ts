import { NextRequest, NextResponse } from "next/server";
import { editTicketWithAI } from "@/prismaActions";
import { simulateEmailSending } from "@/app/utilites/simulateEmailSending";

export const POST = async (request: NextRequest) => {
  try {
    if (!request.body) {
      return new NextResponse(
        JSON.stringify({ error: "Request body is empty" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const ticket = await request.json();

    const updatedTicket = await editTicketWithAI(ticket);

    await simulateEmailSending(updatedTicket);

    return new NextResponse(JSON.stringify({ data: updatedTicket }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error updating ticket with AI:", error);

    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};
