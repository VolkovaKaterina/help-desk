import React from "react";
import { Chip } from "@nextui-org/react";
import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";
import { getStatusColor } from "@/components/admin/TicketsTable/utilites";

interface StatusChipProps {
  status: TicketStatus;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <Chip
      className="capitalize border-none gap-1 text-default-600"
      color={getStatusColor(status)}
      size="sm"
      variant="dot"
    >
      {status}
    </Chip>
  );
};

export default StatusChip;
