import React from "react";
import Link from "next/link";
import { Ticket } from ".prisma/client";
import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";
import { Button } from "@nextui-org/react";
import StatusChip from "@/components/shared/StatusChip";

interface ITicketInfoProps {
  ticket: Ticket;
  handleUpdateStatus: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TicketInfo: React.FC<ITicketInfoProps> = ({
  ticket,
  handleUpdateStatus,
}) => {
  const areButtonsVisible = ticket.status === TicketStatus.NEW;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-6 min-h-screen">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          ← Back to Home
        </Link>
        <div className="mb-4">
          <div className="text-lg font-semibold text-gray-700">
            Ticket ID: <span className="font-normal">{ticket.id}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Status: <StatusChip status={ticket.status as TicketStatus} />
          </div>
        </div>
        <div className="adminResponse bg-gray-100 p-4 rounded-md">
          {" "}
          <p className="text-gray-600 text-sm">{ticket.adminResponse}</p>
        </div>
        {areButtonsVisible && (
          <div className="flex gap-2">
            <Button
              onClick={handleUpdateStatus}
              value={TicketStatus.RESOLVED}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Yes, this resolves my issue
            </Button>
            <Button
              onClick={handleUpdateStatus}
              value={TicketStatus.IN_PROGRESS}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Need Consultant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfo;
