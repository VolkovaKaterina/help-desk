import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";

export const getSystemMessage = (
  status: TicketStatus,
  name: string,
  description: string,
) => {
  const messages = {
    [TicketStatus.NEW]: () =>
      `Given recommendation to ${name}, how to resolve "${description}" and current status "${status}", generate a professional and helpful response. in the end say : Best regards, Support Team.`,
    [TicketStatus.IN_PROGRESS]: () =>
      `Say to ${name} that our consultant will contact with hin or here, generate a professional response. in the end say : Best regards, Support Team.`,
    [TicketStatus.RESOLVED]: () =>
      `Say to ${name}, that his issue has been resolved, generate a professional response. in the end say : Best regards, Support Team.`,
  };

  return (
    messages[status] ||
    (() => "Processing your request. Best regards, Support Team.")
  )();
};
