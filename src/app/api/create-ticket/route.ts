import { NextResponse, NextRequest } from "next/server";
import { createTicketSchema } from "@/app/schemas/ticketsFormSchema";
import { simulateEmailSending } from "@/app/utilites/simulateEmailSending";
import { createTicket } from "@/prismaActions/createTicket";

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<unknown>> => {
  try {
    const data = await request.json();
    const result = createTicketSchema.safeParse(data);

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({ errors: result.error.flatten().fieldErrors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const submission = await createTicket(result.data);

    await simulateEmailSending(submission);

    return new NextResponse(JSON.stringify({ submission }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
