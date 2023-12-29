"use client";
import React, { useEffect, useState } from "react";
import { Ticket } from ".prisma/client";

import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";
import { notFound } from "next/navigation";
import TicketSkeleton from "@/components/user-request/TicketSkeleton";
import TicketInfo from "@/components/user-request/TicketInfo";
import { getTicket, updateTicketWithAI } from "@/app/services/api.service";

interface ITicketInfoPageProps {
  params: {
    ticketId: string;
  };
}

const TicketInfoPage = ({ params }: ITicketInfoPageProps) => {
  const { ticketId } = params;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateStatus = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!ticket) return;

    const newStatus = event.currentTarget.value as TicketStatus;
    const needDirectContact =
      newStatus === TicketStatus.IN_PROGRESS ? "YES" : "NO";

    try {
      setLoading(true);
      const updatedTicket = await updateTicketWithAI({
        ...ticket,
        status: newStatus,
        needDirectContact,
      });
      setTicket(updatedTicket.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndUpdateTicket = async () => {
      try {
        setLoading(true);
        const fetchedTicket = await getTicket(ticketId);
        setTicket(fetchedTicket);

        if (fetchedTicket.status === TicketStatus.NEW) {
          const updatedTicket = await updateTicketWithAI(fetchedTicket);
          setTicket(updatedTicket.data);
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to update or get ticket",
        );
      } finally {
        setLoading(false);
      }
    };
    if (ticketId) {
      getAndUpdateTicket();
    }
  }, [ticketId]);

  if (loading) {
    return <TicketSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ticket) {
    return null;
  }
  if (!params.ticketId) {
    notFound();
  }

  return <TicketInfo ticket={ticket} handleUpdateStatus={handleUpdateStatus} />;
};

export default TicketInfoPage;
