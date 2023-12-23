import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";

export const statuses = [
  { label: TicketStatus.NEW, value: TicketStatus.NEW },
  { label: TicketStatus.IN_PROGRESS, value: TicketStatus.IN_PROGRESS },
  { label: TicketStatus.RESOLVED, value: TicketStatus.RESOLVED },
];

export const toastrMessage = {
  error: "Failed to update the ticket.",
  updateTicket: {
    success: "Ticket was updated successful.",
    error: "Failed to updated the ticket.",
  },
};

export const backToAdminPath = "/admin";
