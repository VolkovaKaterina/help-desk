import { Ticket } from ".prisma/client";

export const simulateEmailSending = async (ticketData: Ticket) => {
  // Simulate some delay as if sending an email
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Log the email content to console for simulation
  console.log(
    `Sending email to ${
      ticketData.email
    }: Ticket created with details: ${JSON.stringify(ticketData)}`,
  );
};
