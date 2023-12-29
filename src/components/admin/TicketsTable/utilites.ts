import {
  ChipColor,
  TicketStatus,
} from "@/components/admin/TicketsTable/TicketsTable.models";

export const getStatusColor = (status: string): ChipColor => {
  const colorMap: Record<string, ChipColor> = {
    [TicketStatus.NEW]: "primary",
    [TicketStatus.IN_PROGRESS]: "danger",
    [TicketStatus.RESOLVED]: "success",
  };

  return colorMap[status] || "default";
};

export const getGoToEditPath = (id: string) => `/admin/tickets/${id}/edit`;

export const getNextTicketStatus = (currentStatus: string): string => {
  switch (currentStatus) {
    case TicketStatus.NEW:
      return TicketStatus.IN_PROGRESS;
    case TicketStatus.IN_PROGRESS:
      return TicketStatus.RESOLVED;
    case TicketStatus.RESOLVED:
      return TicketStatus.NEW;
    default:
      return TicketStatus.NEW;
  }
};
