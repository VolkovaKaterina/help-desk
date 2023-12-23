import { NextRequest, NextResponse } from "next/server";
import { editTicket } from "@/prismaActions";

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

    const updatedTicket = await editTicket(ticket);

    return new NextResponse(JSON.stringify({ data: updatedTicket }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error updating ticket:", error);

    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};
